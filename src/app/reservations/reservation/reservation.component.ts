import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  fetchRooms: any[] = [];
  getAllCINs: any[] = [];


  Reservations: any[] = [];
  userId: any;
  numChambre: any;
  cin: any;


  startDate: string = '';
  endDate: string = '';
  reservationCount: number = 0;

  showDateInput:boolean = false;
  showNonReservedRooms:boolean = false;
  showNonReservedCINs:boolean = false;


  constructor(private router: Router,private reservationService: ReservationService,private route: ActivatedRoute,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(
      (res) => {
        console.log("response from BackEnd", res);
        this.Reservations = res;
       // console.log("testtttttt",this.fetchRooms);
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
          // alert('Reservation accepted!');
          this.snackBar.open('Reservation accepted!', 'OK', { duration: 3000 });
          this.ngOnInit(); // Refresh data
      }
  );
}

  onRefuse(id: string): void {
    this.reservationService.refuseReservation(id).subscribe(
       (response) => {
        // alert('Reservation refused!');
        this.snackBar.open('Reservation refused!', 'OK', { duration: 3000 });
        this.ngOnInit(); // Refresh data
      },   
    );
  }

    navigateToAddreservation(): void {
      this.router.navigate(['/ajouterreservation']);
    } 

    
    toggleDateInput(): void {
      this.showDateInput = !this.showDateInput;
    }
    
    getReservationCount() {
      if (this.startDate && this.endDate) {
        this.reservationService.getReservationCount(this.startDate, this.endDate)
          .subscribe(count => {
            this.reservationCount = count;
           // this.toggleDateInput(); // after fetching the count we can hide it
          }, error => {
            // handle errors here
            console.error('There was an error!', error);
          });
      }
    }


    // to get data from ADD-RESERVATION ( 2 functions for cins and rooms)

    @ViewChild(AddReservationComponent) reservationComponent!: AddReservationComponent;

   
  
    handleFetchedRooms(rooms: any[]) {
      this.fetchRooms = rooms;
    }
  
    handleFetchedCINs(cins: any[]) {
      this.getAllCINs = cins;
    }

    toggleNonReservedRooms(): void {
      this.showNonReservedRooms =! this.showNonReservedRooms;
      if(this.showNonReservedRooms){
        this.fetchUnreservedRooms
      }
    }

    fetchUnreservedRooms() {
      this.reservationComponent.fetchAllUnreservedRooms();
    }

    toggleNonReservedCins():void {
      this.showNonReservedCINs =! this.showNonReservedCINs;
      if(this.showNonReservedCINs){
        this.fetchUnreservedCINs
      }
    }

    fetchUnreservedCINs() {
      this.reservationComponent.fetchAllUnreservedCINs();
    }





  }



 






