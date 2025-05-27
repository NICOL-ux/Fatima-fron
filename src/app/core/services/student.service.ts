import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { environment } from '../environment/environment'; // Asegúrate de que esta ruta es correcta

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {}

  // 📌 Crear estudiante
  createStudent(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Obtener todos los estudiantes
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Obtener estudiante por ID
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Buscar por DNI
  getStudentByDni(dni: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/dni/${dni}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Actualizar estudiante
  updateStudent(id: string, student: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/${id}`, student).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Eliminar estudiante
  deleteStudent(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // 📌 Manejo centralizado de errores
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
