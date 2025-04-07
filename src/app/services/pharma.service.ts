import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PharmaService {
  private apiUrl = `${environment.apiUrl}/pharma`;

  constructor(private http: HttpClient) {}

  getPharmaEntries(userId: Number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-pharma-entries/${userId}`);
  }
}
