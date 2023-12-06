import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private baseUrl="http://localhost:8088/universite"

  constructor(private httpClient : HttpClient) { }


  getAllUniversities() : Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/findAll`);
    


  getUniversiteById(idUniversite : number) : Observable<Universite> {
    return this.httpClient.get<Universite>(`${this.baseUrl}/findById/${idUniversite}` );
  }

  saveUniversite(objUniversite : Universite) : Observable<Universite>{
    return this.httpClient.post<Universite>(`${this.baseUrl}/add`, objUniversite);
}

 updateUniversite(idUniversite : number, universite : Universite) : Observable<Universite>{
    return this.httpClient.put<Universite>(`${this.baseUrl}/update/${idUniversite}`, universite);
}

deleteUniversite(idUniversite : number) : Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${idUniversite}`);
}

getUniversByNomUnivers(nomUniversite: string): Observable<Universite> {
  return this.httpClient.get<Universite>(`${this.baseUrl}/search/${encodeURIComponent(nomUniversite)}`);
}

getUniversByNomFoyer(nomFoyer: String): Observable<Universite> {
  return this.httpClient.get<Universite>(`${this.baseUrl}/byFoyer/${nomFoyer}`);
}

getUniversByAdresse(adresse : String) : Observable<Universite[]>{
  return this.httpClient.get<Universite[]>(`${this.baseUrl}/byAdresseUnivers/${adresse}`);
}

getNombreTotalChambres(nomUniversite: String): Observable<number> {
  return this.httpClient.get<number>(`${this.baseUrl}/${nomUniversite}/statnombreTotalChambres`);
}

getByNombreMinChambres(nombreMinChambres: number): Observable<Universite[]> {
  return this.httpClient.get<Universite[]>(`${this.baseUrl}/nombreMinChambres/${nombreMinChambres}`);
}




}
