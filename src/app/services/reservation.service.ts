import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  reservationURL="http://localhost:8088/reservation"

  constructor(private client:HttpClient) { }

  addReservation(reservation:any){
    return this.client.post(this.reservationURL,reservation);
  }

  getAllReservations(): Observable<any[]> {
    return this.client.get<any[]>(`${this.reservationURL}/findAll`);
  }

  getAllReservationsById(id:any): Observable<any[]> {
    return this.client.get<any[]>(`${this.reservationURL}/${id}`)
  }

  deleteReservation(id:any){
    return this.client.delete(`${this.reservationURL}/delete/${id}`) 
  }

  updateReservation(reservation:any){
    return this.client.put(`${this.reservationURL}/${reservation.id}`, reservation)
  }

  ajouterReservationEtAssignerAChambreEtAEtudiant(numChambre : any , cin : any){
    return this.client.post(`${this.reservationURL}/generateReservation/${numChambre}/${cin}`,{});
  }

  acceptReservation(id: string): Observable<any> {
    return this.client.put(`${this.reservationURL}/${id}/accept`, null);
  }

  refuseReservation(id: string): Observable<any> {
    return this.client.put(`${this.reservationURL}/${id}/refuse`, null);
  }

  getAllRooms(): Observable<any[]> {
    return this.client.get<any[]>(`${this.reservationURL}/roomNumbers`);
  }

  getAllCINs(): Observable<any[]> {
    return this.client.get<any[]>(`${this.reservationURL}/cins`);
  }

  getReservationCount(startDate:string,endDate:string): Observable<any> {
    return this.client.get<any>(`${this.reservationURL}/getReservationParAnneeUniversitaire`,{
    params: {
        debutAnnee: startDate,
        finAnnee: endDate
      }
    });
  }

  getAllUnreservedRooms(): Observable<any[]>{
    return this.client.get<any[]>(`${this.reservationURL}/unreservedchambre`);
  }

  getAllUnreservedCins(): Observable<any[]>{
    return this.client.get<any[]>(`${this.reservationURL}/unreservedcins`);
  }


  getAllidRooms(): Observable<any[]> {
    return this.client.get<any[]>(`${this.reservationURL}/idchambres`);
  }
 
}
