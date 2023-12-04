import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bloc } from 'src/app/models/bloc';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private baseUrl = "http://localhost:8088/bloc/";

  constructor(private http: HttpClient) { }

  findAll():Observable<Bloc[]> {
    return this.http.get<Bloc[]>(this.baseUrl + "findAll");
  }

  addBloc(data: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(this.baseUrl + "add", data);
  }

  deleteBloc(idBloc: number) {
    return this.http.delete(this.baseUrl + "delete/" + idBloc);
  }


  updateBloc(updateBloc:Bloc,idBloc: number):Observable <Bloc>{
    const url = `${this.baseUrl}update/${idBloc}`;
    return this.http.put<Bloc>(url , updateBloc);
  }

  findById(idBloc: number):Observable<Bloc> {
    return this.http.get<Bloc>(this.baseUrl + idBloc);
  }
  // bloc.service.ts
findByNomBlocAndCapaciteBloc(nomBloc: string, capacite: number): Observable<Bloc[]> {
  const url = `${this.baseUrl}findByNomBlocAndCapaciteBloc?name=${nomBloc}&capacite=${capacite}`;
  return this.http.get<Bloc[]>(url);
}
findByNomBloc(nomBloc: string): Observable<Bloc[]> {
  // Effectuer la requête de recherche en utilisant le nom du foyer comme critère
  const url = `${this.baseUrl}findByNameBloc?name=${nomBloc}`;

  return this.http.get<Bloc[]>(url);
}
findByNomBlocContaining(nomBloc: string): Observable<Bloc | Bloc[]> {
  const url = `${this.baseUrl}votre_endpoint_de_recherche_partielle`; // Remplacez cela par votre endpoint d'API

  // Utilisez la méthode HttpClient pour effectuer la requête HTTP appropriée
  return this.http.get<Bloc | Bloc[]>(`${url}?nomBloc=${nomBloc}`);
}

}
