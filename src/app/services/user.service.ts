import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUserDetails(userStringId: String | null): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/get-user-details/${userStringId}`
    );
  }
}
