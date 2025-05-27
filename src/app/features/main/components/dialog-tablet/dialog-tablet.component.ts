import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TabletsService, Tablet } from '../../../../core/services/tablets.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-tablet',
  templateUrl: './dialog-tablet.component.html',
  styleUrls: ['./dialog-tablet.component.scss'],
  standalone: true,
  imports: [
    // Angular modules
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ]
})
export class DialogTabletComponent implements OnInit {
  tabletForm!: FormGroup;
  isEditMode = false;
  loading = false;
  statusOptions = ['free', 'in_use', 'inactive'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogTabletComponent>,
    private tabletsService: TabletsService,
    @Inject(MAT_DIALOG_DATA) public data?: { tablet: Tablet }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.tablet;

    this.tabletForm = this.fb.group({
      code: [this.data?.tablet?.code || '', [Validators.required]],
      status: [this.data?.tablet?.status || 'free', [Validators.required]],
    });
  }

  onSave(): void {
    if (this.tabletForm.invalid) return;

    this.loading = true;
    const tabletData = this.tabletForm.value;

    if (this.isEditMode && this.data?.tablet?._id) {
      this.tabletsService.update(this.data.tablet._id, tabletData).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
    } else {
      this.tabletsService.create(tabletData).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
