import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(userStringId: string, userPass: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userStringId, userPass });
  }

  signUp(
    userStringId: string,
    userPass: string,
    userEmail: string,
    userName: string,
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/create-new-user`, {
      userId: userStringId,
      userPass,
      userEmail,
      userName,
    });
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getTokenPayload(): any | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const tokenParts = token.split('.');

      if (tokenParts.length !== 3) {
        return null;
      }

      return JSON.parse(atob(tokenParts[1]));
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getUserIdFromToken(): string | null {
    const payload = this.getTokenPayload();

    if (!payload?.sub) {
      return null;
    }

    sessionStorage.setItem('userId', payload.sub);

    return payload.sub;
  }

  getRoleFromToken(): string | null {
    const payload = this.getTokenPayload();

    return payload?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRoleFromToken() === 'ADMIN';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
