import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TabletsService, Tablet } from '../../../../core/services/tablets.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

type TabletStatus = 'free' | 'in_use' | 'inactive';

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
    MatDialogModule
  ]
})
export class DialogTabletComponent implements OnInit {
  tabletForm!: FormGroup;
  isEditMode = false;
  loading = false;
  statusOptions: TabletStatus[] = ['free', 'in_use', 'inactive'];

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

    const code = this.tabletForm.get('code')?.value as string;
    const statusRaw = this.tabletForm.get('status')?.value as string | null;

    const validStatuses: TabletStatus[] = ['free', 'in_use', 'inactive'];
    const status: TabletStatus = validStatuses.includes(statusRaw as TabletStatus)
      ? (statusRaw as TabletStatus)
      : 'free';

    const tabletData: { code: string; status: TabletStatus } = { code, status };

    if (this.isEditMode && this.data?.tablet?._id) {
      this.tabletsService.update(this.data.tablet._id, tabletData).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: () => (this.loading = false),
        complete: () => (this.loading = false),
      });
    } else {
     this.tabletsService.createTablet(tabletData).subscribe({
  next: (res) => this.dialogRef.close(res),
  error: (err) => {
    console.error('Error al guardar tablet:', err);
    this.loading = false;
  },
  complete: () => (this.loading = false),
});

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
