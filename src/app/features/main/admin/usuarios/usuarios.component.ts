import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService, } from '../../../../core/services/user.service';
import { DialogUsuarioComponent } from '../../components/dialog-usuario/dialog-usuario.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  users: User[] = [];
  loading = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar usuarios:', err);
        // Aquí podrías mostrar un snackbar o alguna notificación de error
      },
    });
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: user ?? null,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar usuario',
        message: `¿Seguro que deseas eliminar a ${user.firstName} ${user.lastName}?`,
        color: 'warn',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed && user._id) {
        this.userService.delete(user._id).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
            // Aquí también podrías mostrar una notificación de error
          }
        });
      }
    });
  }
}
