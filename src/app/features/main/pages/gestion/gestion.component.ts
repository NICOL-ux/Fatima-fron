import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TabletsService, Tablet } from '../../../../core/services/tablets.service';
import { DialogTabletComponent } from '../../components/dialog-tablet/dialog-tablet.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { DialogAssignDniComponent } from '../../components/dialog-assign-dni-component/dialog-assign-dni-component.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  
  tablets: Tablet[] = [];
  filteredTablets: Tablet[] = [];
  loading = false;
  searchText = '';

  constructor(private tabletsService: TabletsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTablets();
  }

  loadTablets(): void {
    this.loading = true;
    this.tabletsService.getAll().subscribe({
      next: (data) => {
        this.tablets = data;
        this.filteredTablets = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  filterTablets(value: string): void {
    this.filteredTablets = this.tablets.filter((t) =>
      t.code.toLowerCase().includes(value.toLowerCase()) ||
      t.assignedTo?.dni.includes(value)
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogTabletComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTablets();
    });
  }

  openEditDialog(tablet: Tablet): void {
    const dialogRef = this.dialog.open(DialogTabletComponent, {
      width: '400px',
      data: { tablet },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTablets();
    });
  }

  confirmDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar Tablet',
        message: '¿Seguro que quieres eliminar esta tablet?',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        color: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.tabletsService.delete(id).subscribe(() => this.loadTablets());
      }
    });
  }

  assignTablet(tablet: Tablet): void {
  const dialogRef = this.dialog.open(DialogAssignDniComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((dni: string | null) => {
    if (dni) {
      this.tabletsService.assign(tablet._id!, +dni).subscribe(() => this.loadTablets());
    }
  });


    dialogRef.afterClosed().subscribe((dni: string | false) => {
      if (dni && /^\d{8}$/.test(dni)) {
        this.tabletsService.assign(tablet._id!, +dni).subscribe(() => this.loadTablets());
      } else if (dni !== false) {
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'DNI inválido',
            message: 'Debe ingresar un DNI válido de 8 dígitos.',
            confirmText: 'Entendido',
            color: 'warn',
          },
        });
      }
    });
  }

  unassignTablet(tablet: Tablet): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Desasignar Tablet',
        message: `¿Deseas desasignar la tablet "${tablet.code}" del estudiante?`,
        confirmText: 'Desasignar',
        cancelText: 'Cancelar',
        color: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.tabletsService.unassign(tablet._id!).subscribe(() => this.loadTablets());
      }
    });
  }

  // Agrega este método si quieres mantener el nombre confirmAssign en el HTML
  confirmAssign(tablet: Tablet): void {
    this.assignTablet(tablet);
  }
}
