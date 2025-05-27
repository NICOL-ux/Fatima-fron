import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment/environment';

export interface User {
  _id: string;
  email: string;
  role: string;
  name: string;
}

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
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());
  private _user$ = new BehaviorSubject<User | null>(this.getUserFromStorage());

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  get user$() {
    return this._user$.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);

        if (!response.user) {
          throw new Error('No user object in login response');
        }

        const user: User = {
          _id: response.user._id,
          email: response.user.email,
          role: response.user.role,
          name: response.user.name,
        };

        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        this._isLoggedIn$.next(true);
        this._user$.next(user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this._isLoggedIn$.next(false);
    this._user$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}
