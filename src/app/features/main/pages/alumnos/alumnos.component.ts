import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAlumnoComponent } from '../../components/dialog-alumno/dialog-alumno.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-alumnos',
  standalone: true,
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
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

})
export class AlumnosComponent implements OnInit {
  students: Student[] = [];
  filteredAlumnosList: Student[] = [];
  searchText: string = '';
  loading = false;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.filteredAlumnosList = [...this.students];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes:', err);
        this.loading = false;
      }
    });
  }

  filterStudents(value: string) {
    this.searchText = value.trim().toLowerCase();
    if (!this.searchText) {
      this.filteredAlumnosList = [...this.students];
      return;
    }
    this.filteredAlumnosList = this.students.filter(alumno =>
      alumno.dni.toLowerCase().includes(this.searchText) ||
      alumno._id.toLowerCase().includes(this.searchText)
    );
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(DialogAlumnoComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadStudents();
      }
    });
  }

  openEditDialog(alumno: Student) {
    const dialogRef = this.dialog.open(DialogAlumnoComponent, {
      width: '400px',
      data: { ...alumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        this.loadStudents();
      }
    });
  }

  openDeleteConfirm(alumno: Student) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Seguro que quieres eliminar al estudiante ${alumno.firstName} ${alumno.lastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm === true) {
        this.studentService.deleteStudent(alumno._id!).subscribe({
          next: () => this.loadStudents(),
          error: err => console.error('Error eliminando estudiante:', err)
        });
      }
    });
  }
}