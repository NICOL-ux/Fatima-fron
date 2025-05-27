import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  template: `
    <h2 mat-dialog-title>Asignar Tablet</h2>
    <mat-dialog-content>
      <form #form="ngForm" (ngSubmit)="onConfirm()" novalidate>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>DNI del estudiante</mat-label>
          <input
            matInput
            name="dni"
            [(ngModel)]="dni"
            required
            pattern="^\\d{8}$"
            #dniInput="ngModel"
            autocomplete="off"
            maxlength="8"
          />
          <mat-error *ngIf="dniInput.invalid && dniInput.touched">
            El DNI debe tener exactamente 8 dígitos numéricos.
          </mat-error>
        </mat-form-field>
        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Asignar</button>
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
