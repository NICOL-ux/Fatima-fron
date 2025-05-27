import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TabletsService, TabletStatus } from '../../../../core/services/tablets.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule
  ],
})
export class IngresoComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private tabletsService = inject(TabletsService);
  private snackBar = inject(MatSnackBar);

  loading = false;

  statusOptions: TabletStatus[] = ['free', 'in_use', 'inactive'];

  tabletForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(4)]],
    status: ['free', Validators.required],
  });

  guardarTablet(): void {
    if (this.tabletForm.invalid) return;

    this.loading = true;

    const code = this.tabletForm.get('code')!.value as string;
    const statusRaw = this.tabletForm.get('status')!.value as string | null;

    const status: TabletStatus = this.statusOptions.includes(statusRaw as TabletStatus)
      ? (statusRaw as TabletStatus)
      : 'free';

    const tabletData = { code, status };

    this.tabletsService.createTablet(tabletData).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.open('Tablet guardada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/index/gestion']); // ✅ Ruta protegida pero válida
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Error al guardar la tablet', 'Cerrar', { duration: 3000 });
        console.error('Error al guardar la tablet:', err);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/index/gestion']);
  }
}
