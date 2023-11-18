import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bloc } from 'src/app/models/bloc';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private baseUrl = "http://localhost:8089/bloc/";

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

}
