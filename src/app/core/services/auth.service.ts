import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/user.model';

interface LoginResponse {
  accessToken: string;
  message: string;
  status: number;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private _userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  user$ = this._userSubject.asObservable();

  private _isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  isLoggedIn$ = this._isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (!response.user || !response.accessToken) {
          throw new Error('Invalid login response from server.');
        }

        // Construir usuario excluyendo password, que puede ser undefined
        const user: User = {
          _id: response.user._id,
          email: response.user.email,
          role: response.user.role ?? 'user',
          firstName: response.user.firstName ?? '',
          lastName: response.user.lastName ?? '',
          // password no se asigna aquí para evitar errores de tipo
        };

        this.setUserAndToken(user, response.accessToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this._isLoggedInSubject.next(false);
    this._userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Guarda el usuario y token en el localStorage y actualiza los observables.
   */
  setUserAndToken(user: User, token: string): void {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this._userSubject.next(user);
    this._isLoggedInSubject.next(true);
  }

  /**
   * Intenta obtener el usuario desde localStorage.
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
      const user = JSON.parse(userJson) as User;
      if (!user.role) {
        user.role = 'user';
      }
      return user;
    } catch {
      return null;
    }
  }
}
