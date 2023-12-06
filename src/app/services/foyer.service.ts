import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foyer } from '../models/foyer';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  private apiUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  getFoyes(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/foyer/findAll`);
  }
  updateFoyer(idFoyer: number, updatedFoyer: Foyer): Observable<Foyer> {
    const url = `${this.apiUrl}/foyer/update/${idFoyer}`;
    return this.http.put<Foyer>(url, updatedFoyer);
  }
   // Add a method to get a foyer by ID
   getFoyerById(idFoyer: number): Observable<Foyer> {
    const url = `${this.apiUrl}/foyer/${idFoyer}`;
    return this.http.get<Foyer>(url);
  }
  deleteFoyer(idFoyer: number): Observable<void> {
    const url = `${this.apiUrl}/foyer/delete/${idFoyer}`;
    return this.http.delete<void>(url);
  }
  ajouterFoyer(newFoyer: Foyer , id: number): Observable<Foyer> {
    const url = `${this.apiUrl}/foyer/add/${id}`;
    return this.http.post<Foyer>(url, newFoyer);
  }
  findAllUniversite(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/foyer/findAlluniversite`);
  }
  searchFoyersByNomFoyer(nomFoyer: string): Observable<Foyer[]> {
    // Effectuer la requête de recherche en utilisant le nom du foyer comme critère
    const url = `${this.apiUrl}/foyer/search/${encodeURIComponent(nomFoyer)}`;

    return this.http.get<Foyer[]>(url);
  }
 
  getCountChambresByFoyerId(idFoyer: any): Observable<any> {
    const url = `${this.apiUrl}/foyer/${idFoyer}/countChambres`;
    return this.http.get<Foyer>(url);
  }

  findByUniversite(nomUniversite: string): Observable<Foyer[]> {
    const url = `${this.apiUrl}/foyer/findByUniversite/${nomUniversite}`;
    return this.http.get<Foyer[]>(url);
  }

  getUniversiteByFoyer(idFoyer: number): Observable<Foyer> {
    const url = `${this.apiUrl}/foyer/universite/${idFoyer}`;
    return this.http.get<Foyer>(url);
  }
  
  
}
