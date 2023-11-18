import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private baseUrl="http://localhost:8089/universites"

  constructor(private httpClient : HttpClient) { }

  getAllUniversities() : Observable<Universite[]>{
    return this.httpClient.get<Universite[]>(`${this.baseUrl}/findAll`);

  }

  getUniversiteById(idUniversite : number) : Observable<Universite> {
    return this.httpClient.get<Universite>(`${this.baseUrl}/findById/${idUniversite}`);
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

}
