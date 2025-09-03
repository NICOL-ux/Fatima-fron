import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../core/services/student.service';
import { Student } from '../../../../core/models/student.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

type AulaSummary = { grade: number; section: string; count: number };

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
  aulaSummary: AulaSummary[] = [];
  totalStudents: number = 0;
  isLoading: boolean = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;

    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        console.log('Estudiantes cargados:', this.students); 
        this.calculateAulaSummary();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.isLoading = false;
      }
    });
  }

  calculateAulaSummary(): void {
    const summaryMap = new Map<string, AulaSummary>();

    for (const student of this.students) {
      const grade = Number(student.grade); // Asegura que sea un número
      const section = student.section?.toUpperCase?.() || 'N/A';
      const key = `${grade}-${section}`;

      if (summaryMap.has(key)) {
        summaryMap.get(key)!.count += 1;
      } else {
        summaryMap.set(key, { grade, section, count: 1 });
      }
    }

    this.aulaSummary = Array.from(summaryMap.values()).sort((a, b) => {
      if (a.grade !== b.grade) {
        return a.grade - b.grade;
      }
      return a.section.localeCompare(b.section);
    });

    this.totalStudents = this.students.length;
    console.log('Total de estudiantes:', this.totalStudents); // ✅ Debug
    console.log('Resumen de aulas:', this.aulaSummary);       // ✅ Debug
  }

  refreshSummary(): void {
    this.loadStudents();
  }

  aulaTrackByFn(index: number, aula: AulaSummary): string {
    return `${aula.grade}-${aula.section}`;
  }

  get filteredAulaSummary(): AulaSummary[] {
    return this.aulaSummary;
  }
}
