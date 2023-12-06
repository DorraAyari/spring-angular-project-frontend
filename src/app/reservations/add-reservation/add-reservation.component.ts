import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent {

  allRooms: any[] = [];
  allCINs: any[] = [];
  @Input() getAllRooms: any[] = [];
  @Input() getAllCINs: any[] = [];
  @Output() fetchRooms = new EventEmitter<any[]>();
  @Output() fetchCINs = new EventEmitter<any[]>();


 // Initialize your reservation object
 reservation = {
  numeroChambre: '',
  cin: ''
}; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,  
    private reservationService: ReservationService // Inject the service
  ) 
  {  }
  
  ngOnInit(): void {
    this.fetchAllUnreservedRooms();
    this.fetchAllUnreservedCINs();
  }

  addReservationToRoomAndStudent(): void {
    
    this.reservationService.ajouterReservationEtAssignerAChambreEtAEtudiant(this.reservation.numeroChambre, this.reservation.cin).subscribe(
      
      (reservation) => {
        console.log("Reservation added", reservation);
        alert('Nouvelle réservation ajoutée avec succès!');

        // Navigate to the home page
        this.router.navigate(['/gestionreservation']);
      },
      (error)=>{
        console.log("Error adding reservation", error);
      }
    )
  }




    fetchAllUnreservedRooms(){
      this.reservationService.getAllUnreservedRooms().subscribe(
        (rooms)=>
        {
          this.allRooms = rooms;
          this.fetchRooms.emit(this.allRooms);
          console.log("Rooms not reserved fetched successfully", rooms);  
        },
        (error)=>{
          console.log("Error fetching rooms", error);
        }
        
      )
    }

    fetchAllUnreservedCINs() {
      this.reservationService.getAllUnreservedCins().subscribe(
        (cin)=>
          { 
            this.allCINs = cin;
            this.fetchCINs.emit(this.allCINs);
            console.log("CINs not reserved fetched successfully", cin);
          },
          (error)=>{
            console.log("Error fetching CINs", error);
          }
      )
    }

   
   
    fetchRoomsClicked() {
      this.fetchRooms.emit();
    }

    fetchCINsClicked() {
      this.fetchCINs.emit();
    }
 

    
   /*  fetchAllRooms() {
      this.reservationService.getAllRooms().subscribe(
        (rooms)=>
        {
          this.allRooms = rooms;
          console.log("Rooms fetched successfully", rooms);  
        },
        (error)=>{
          console.log("Error fetching rooms", error);
        }
        
      )
    } */

/*     fetchAllCINs() {
      this.reservationService.getAllCINs().subscribe(
        (cin)=>
          { 

            this.allCINs = cin;
            console.log("CINs fetched successfully", cin);
          },
          (error)=>{
            console.log("Error fetching CINs", error);
          }
      )
    } */
}
