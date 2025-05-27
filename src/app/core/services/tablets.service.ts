import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment'; 

export type TabletStatus = 'free' | 'in_use' | 'inactive';

export interface Tablet {
  _id?: string;
  code: string;
  status: TabletStatus;
  assignedTo?: {
    dni: string;
    firstName: string;
    lastName: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabletsService {
  private apiUrl = `${environment.apiUrl}/tablets`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las tablets
   */
  getAll(): Observable<Tablet[]> {
    return this.http.get<Tablet[]>(this.apiUrl);
  }

  /**
   * Crear nueva tablet
   */
  createTablet(data: { code: string; status: TabletStatus }): Observable<Tablet> {
    return this.http.post<Tablet>(this.apiUrl, data);
  }

  /**
   * Actualizar tablet
   */
  update(id: string, tablet: Partial<Tablet>): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}`, tablet);
  }

  /**
   * Eliminar tablet
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Asignar tablet a un estudiante por DNI
   */
  assign(id: string, dni: number | string): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}/assign`, { dni });
  }

  /**
   * Desasignar tablet
   */
  unassign(id: string): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}/unassign`, {});
  }
}
