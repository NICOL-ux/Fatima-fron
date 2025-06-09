import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

export interface ConfirmDialogData {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  color?: 'primary' | 'accent' | 'warn';
  icon?: string;
  disableClose?: boolean;
  showCancel?: boolean;
  width?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  color: 'primary' | 'accent' | 'warn';
  icon?: string;
  showCancel: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // Usamos valores por defecto si no se proporcionan
    this.title = data.title ?? 'Confirmar acción';
    this.message = data.message ?? '¿Estás seguro de realizar esta acción?';
    this.confirmText = data.confirmText ?? 'Confirmar';
    this.cancelText = data.cancelText ?? 'Cancelar';
    this.color = data.color ?? 'primary';
    this.icon = data.icon;
    this.showCancel = data.showCancel ?? true;

    if (data.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getIcon(): string {
    return this.icon ?? this.getDefaultIcon();
  }

  private getDefaultIcon(): string {
    switch (this.color) {
      case 'warn': return 'warning';
      case 'accent': return 'help_outline';
      default: return 'info';
    }
  }
}
