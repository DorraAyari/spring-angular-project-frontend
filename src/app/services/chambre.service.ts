// services/chambre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chambre } from '../models/chambre';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  private apiUrl = 'http://localhost:8089'; 

  constructor(private http: HttpClient) {}

  getChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/chambre/findAll`);
  }
  updateChambre(chambreId: number, updatedChambre: Chambre): Observable<Chambre> {
    const url = `${this.apiUrl}/chambre/update/${chambreId}`;
    return this.http.put<Chambre>(url, updatedChambre);
  }
   // Add a method to get a chambre by ID
   getChambreById(chambreId: number): Observable<Chambre> {
    const url = `${this.apiUrl}/chambre/${chambreId}`;
    return this.http.get<Chambre>(url);
  }
  deleteChambre(chambreId: number): Observable<void> {
    const url = `${this.apiUrl}/chambre/delete/${chambreId}`;
    return this.http.delete<void>(url);
  }
  ajouterChambre(newChambre: Chambre): Observable<Chambre> {
    const url = `${this.apiUrl}/chambre/add`;
    return this.http.post<Chambre>(url, newChambre);
  }
  
}
