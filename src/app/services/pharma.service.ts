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

  getPharmaEntries(userIntId: Number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/get-pharma-entries/${userIntId}`
    );
  }

  addPharmaEntry(pharmaDetails: Object) {
    return this.http.post(`${this.apiUrl}/add-pharma-entry`, pharmaDetails);
  }

  deletePharmaEntry(userIntId: Number, pharmaIntId: Number) {
    return this.http.delete(
      `${this.apiUrl}/delete-pharma-entry/${userIntId}/${pharmaIntId}`
    );
  }

  updatePharmaEntry(
    userIntId: Number,
    pharmaIntId: Number,
    pharmaDetails: Object
  ) {
    return this.http.patch(
      `${this.apiUrl}/update-pharma-entry/${userIntId}/${pharmaIntId}`,
      pharmaDetails
    );
  }
}
