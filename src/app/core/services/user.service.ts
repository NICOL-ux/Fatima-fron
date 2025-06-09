import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Idealmente, esta URL debería venir de environment para distintos entornos (dev, prod, etc)
  private readonly baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  /** Obtener todos los usuarios */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /** Obtener un usuario por ID */
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  /** Crear un nuevo usuario */
  create(user: Partial<User>): Observable<User> {
    // Evitar enviar _id si viene en Partial<User>
    const { _id, ...userData } = user;
    return this.http.post<User>(this.baseUrl, userData);
  }

  /** Actualizar un usuario existente */
  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, user);
  }

  /** Eliminar un usuario */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
