import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  
  Reservations: any[] = [];
  userId: any;
  numChambre: any;
  cin: any;



  constructor(private router: Router,private reservationService: ReservationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(
      (res) => {
        console.log("response from BackEnd", res);
        this.Reservations = res;
      },
      (error) => {
        console.log("Error fetching reservations", error);
      }
    );
  }

  getStatusClass(status: string): string {
    return {
      'ACTIVE': 'status-active',
      'REFUSED': 'status-refused'
    }[status] || 'status-default';
  }

  getAllReservationById(id:any){
    console.log("this is section of one user with this id : ",id); 
    this.reservationService.getAllReservationsById(id).subscribe(
      (res) => {
        console.log("response from BackEnd of reservation by Userid", res);
      this.Reservations = res;
    },
    (error) => {
      console.log("Error fetching reservations by userid", error);
    }
    );
  }

  cancelReservations(id: any){
    console.log("rani khdemt",id); //afficher rani 5demt test click button
    this.reservationService.deleteReservation(id).subscribe(
      (res)=> {
        console.log("Reservation canceled", res);
        this.ngOnInit();
      }
    )
  }

  onAccept(id: string):void {
    console.log("test id on click",id); //afficher rani 5demt test click button
    this.reservationService.acceptReservation(id).subscribe(
        (response) => {
          alert('Reservation accepted!');
          this.ngOnInit(); // Refresh data
      }
  );
}

  onRefuse(id: string): void {
    this.reservationService.refuseReservation(id).subscribe(
       (response) => {
        alert('Reservation refused!');
        this.ngOnInit(); // Refresh data
      },   
    );
  }

    navigateToAddreservation(): void {
      this.router.navigate(['/ajouterreservation']);
    } 

  }



 






