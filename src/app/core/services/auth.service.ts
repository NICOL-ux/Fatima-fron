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
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly _userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  readonly user$ = this._userSubject.asObservable();

  private readonly _isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  readonly isLoggedIn$ = this._isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (!response.user || !response.accessToken) {
          throw new Error('Invalid login response from server.');
        }

        const user: User = {
          _id: response.user._id,
          email: response.user.email,
          role: response.user.role ?? 'user',
          firstName: response.user.firstName ?? '',
          lastName: response.user.lastName ?? '',
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

  getUser(): User | null {
    return this._userSubject.value;
  }

  setUserAndToken(user: User, token: string): void {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    this._userSubject.next(user);
    this._isLoggedInSubject.next(true);
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
      const parsed = JSON.parse(userJson);
      if (typeof parsed !== 'object' || !parsed.email || !parsed._id) {
        return null;
      }

      const user: User = {
        _id: parsed._id,
        email: parsed.email,
        role: parsed.role ?? 'user',
        firstName: parsed.firstName ?? '',
        lastName: parsed.lastName ?? '',
      };

      return user;
    } catch {
      return null;
    }
  }
}
