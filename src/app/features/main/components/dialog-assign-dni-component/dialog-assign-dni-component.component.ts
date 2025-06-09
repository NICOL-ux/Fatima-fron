import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-assign-dni',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
   <h2
  mat-dialog-title
  class="text-xl font-bold text-gray-800 px-6 py-4 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100"
>
  Asignar Tablet
</h2>

<mat-dialog-content class="px-6 py-4 bg-white">
  <form #form="ngForm" (ngSubmit)="onConfirm()" novalidate class="space-y-6">

    <mat-form-field appearance="outline" class="w-full">
      <mat-label class="text-gray-600 font-medium">DNI del estudiante</mat-label>
      <mat-icon matPrefix class="text-blue-500">badge</mat-icon>
      <input
        matInput
        name="dni"
        [(ngModel)]="dni"
        required
        pattern="^\\d{8}$"
        #dniInput="ngModel"
        autocomplete="off"
        maxlength="8"
        class="text-gray-800"
      />
      <mat-error *ngIf="dniInput.invalid && dniInput.touched" class="text-xs text-red-500">
        El DNI debe tener exactamente 8 dígitos numéricos.
      </mat-error>
    </mat-form-field>

    <mat-dialog-actions align="end" class="pt-4 border-t border-gray-100 flex justify-end gap-3">
      <button
        mat-stroked-button
        type="button"
        (click)="onCancel()"
        class="text-gray-600 hover:bg-gray-50 border-gray-300 px-4 py-1 rounded-md transition-colors duration-200 flex items-center"
      >
        <mat-icon class="text-gray-500 mr-1">close</mat-icon>
        Cancelar
      </button>

      <button
        mat-flat-button
        color="primary"
        type="submit"
        [disabled]="form.invalid"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center disabled:bg-blue-300 disabled:shadow-none"
      >
        <mat-icon class="text-white mr-1">check</mat-icon>
        Asignar
      </button>
    </mat-dialog-actions>
  </form>
</mat-dialog-content>

  `,
})
export class DialogAssignDniComponent {
  dni: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAssignDniComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    if (this.dni.match(/^\d{8}$/)) {
      this.dialogRef.close(this.dni);
    }
  }
}
