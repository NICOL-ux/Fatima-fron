import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.scss',
})
export class DialogUsuarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<DialogUsuarioComponent>);
  private data = inject(MAT_DIALOG_DATA, { optional: true }) as Partial<User> | null;

  isEdit = !!this.data;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''], // validación dinámica según si es edición o creación
    role: ['user', Validators.required],
  });

  ngOnInit(): void {
    if (this.isEdit && this.data) {
      this.form.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        role: this.data.role,
      });
      // En edición, contraseña NO es obligatoria
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    } else {
      // En creación, contraseña ES obligatoria
      this.form.get('password')?.setValidators([Validators.required]);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  save(): void {
    if (this.form.invalid) return;

    // Convertimos null a undefined para evitar errores de tipo
    const value = this.form.getRawValue() as Partial<User>;
    Object.keys(value).forEach(key => {
      if (value[key as keyof User] === null) {
        value[key as keyof User] = undefined;
      }
    });

    // Si es edición y password está vacío, lo eliminamos para no enviarlo
    if (this.isEdit && !value.password) {
      delete value.password;
    }

    if (this.isEdit && this.data && this.data._id) {
      this.userService.update(this.data._id, value).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.userService.create(value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
