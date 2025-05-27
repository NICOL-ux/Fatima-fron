import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TabletsService } from '../../../../core/services/tablets.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ingreso-tablet',
  standalone: true,
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class IngresoComponent {
  tabletForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tabletsService: TabletsService
  ) {
    this.tabletForm = this.fb.group({
      code: ['', Validators.required],
      status: ['free', Validators.required] // estado por defecto: libre
    });
  }

  guardarTablet() {
    if (this.tabletForm.valid) {
      this.tabletsService.create(this.tabletForm.value).subscribe({
        next: (tablet) => {
          console.log('Tablet guardada:', tablet);
          this.tabletForm.reset({ status: 'free' }); // reset con valor por defecto
        },
        error: (err) => {
          console.error('Error al guardar tablet:', err);
        }
      });
    }
  }
}
