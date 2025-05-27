import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { History } from '../models/history.model';
import { Observable, map } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private baseUrl = `${environment.apiUrl}/users/history`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<History[]> {
    return this.http.get<{ data: History[] }>(this.baseUrl).pipe(
      map(response => response.data)
    );
  }
}
