import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(userStringId: string, userPass: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userStringId, userPass });
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUserIdFromToken() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    try {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      sessionStorage.setItem('userId', payload.sub);
    } catch (error) {
      console.error('Invalid token', error);
    }
  }
}
