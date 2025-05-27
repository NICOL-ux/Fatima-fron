import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-dialog-alumno',
  templateUrl: './dialog-alumno.component.html',
  styleUrls: ['./dialog-alumno.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatOptionModule,
  ],
})
export class DialogAlumnoComponent {
  studentForm: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAlumnoComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {
    this.isEditMode = !!data;
    this.studentForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      dni: [data?.dni || '', [Validators.required, Validators.minLength(6)]],
      grade: [
        data?.grade || '',
        [Validators.required, Validators.min(1), Validators.max(6)],
      ],
      section: [data?.section || '', Validators.required],
    });
  }

  onSave(): void {
    if (this.studentForm.invalid) return;

    this.loading = true;

    const formValue = this.studentForm.value;

    const studentData: Partial<Student> = {
      ...formValue,
      grade: Number(formValue.grade), // asegurarse que es número
    };

    const request$ = this.isEditMode && this.data?._id
      ? this.studentService.updateStudent(this.data._id, studentData)
      : this.studentService.createStudent(studentData);

    request$.subscribe({
      next: () => this.dialogRef.close('saved'),
      error: (err) => {
        this.loading = false;
        console.error('Error en guardar estudiante:', err);
        alert(JSON.stringify(err.error?.message || err.error || 'Error desconocido'));
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
