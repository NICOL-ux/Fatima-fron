import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { environment } from '../environment/environment'; // ✅ Verifica esta ruta

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

  // 📌 Buscar estudiante por DNI
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
  deleteStudent(id: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // ⚠️ Manejo centralizado de errores
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Ocurrió un error inesperado.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del backend
      errorMsg = `Error ${error.status}: ${error.message}`;
    }

    console.error('HTTP Error:', error);
    return throwError(() => new Error(errorMsg));
  }
}

// ✅ Interfaz para respuesta de eliminación
export interface DeleteResponse {
  message: string;
  deletedId?: string;
}
