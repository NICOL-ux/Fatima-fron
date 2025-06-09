import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './aulas.component.html',
  styleUrl: './aulas.component.scss'
})
export class AulasComponent implements OnInit {

  students: Student[] = [];
  aulaSummary: { grade: number; section: string; count: number }[] = [];
  totalStudents: number = 0;
  isLoading: boolean = false;

  readonly AULA_CAPACITY: number = 35; // puedes ajustar la capacidad aquí

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.calculateAulaSummary();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading students', err);
        this.isLoading = false;
      }
    });
  }

  calculateAulaSummary(): void {
    const summaryMap = new Map<string, { grade: number; section: string; count: number }>();

    this.students.forEach((student) => {
      const key = `${student.grade}-${student.section}`;
      if (summaryMap.has(key)) {
        summaryMap.get(key)!.count += 1;
      } else {
        summaryMap.set(key, { grade: student.grade, section: student.section, count: 1 });
      }
    });

    this.aulaSummary = Array.from(summaryMap.values()).sort((a, b) => {
      if (a.grade !== b.grade) {
        return a.grade - b.grade;
      } else {
        return a.section.localeCompare(b.section);
      }
    });

    this.totalStudents = this.students.length;
  }

  // Para usar con trackBy
  aulaIdFn = (index: number, aula: { grade: number; section: string; count: number }) =>
    `${aula.grade}-${aula.section}`;

  // Botón de "Actualizar"
  refreshSummary(): void {
    this.loadStudents();
  }

  // Métodos de acción
  viewStudents(aula: { grade: number; section: string; count: number }): void {
    console.log('Ver estudiantes de aula', aula);
    // Aquí puedes navegar a un componente o abrir un modal
  }

  editAula(aula: { grade: number; section: string; count: number }): void {
    console.log('Editar aula', aula);
    // Aquí puedes abrir un modal de edición
  }

  deleteAula(aula: { grade: number; section: string; count: number }): void {
    console.log('Eliminar aula', aula);
    // Aquí puedes confirmar y eliminar el aula
  }

  // Para futuro: si quieres agregar filtros
  get filteredAulaSummary(): { grade: number; section: string; count: number }[] {
    return this.aulaSummary;
  }

  openCreateDialog(): void {
    console.log('Abrir diálogo para crear nueva aula');
    // Aquí puedes abrir un modal para crear una nueva aula
  }

}
