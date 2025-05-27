import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment'; 

export interface Tablet {
  _id?: string;
  code: string;
  status: 'free' | 'in_use' | 'inactive';
  assignedTo?: { dni: string; firstName: string; lastName: string } | null;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabletsService {
  private apiUrl = `${environment.apiUrl}/tablets`; // <-- CORREGIDO

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tablet[]> {
    return this.http.get<Tablet[]>(this.apiUrl);
  }

  create(tablet: Partial<Tablet>): Observable<Tablet> {
    return this.http.post<Tablet>(this.apiUrl, tablet);
  }

  update(id: string, tablet: Partial<Tablet>): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}`, tablet);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  assign(id: string, dni: number): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}/assign`, { dni });
  }

  unassign(id: string): Observable<Tablet> {
    return this.http.patch<Tablet>(`${this.apiUrl}/${id}/unassign`, {});
  }
}
