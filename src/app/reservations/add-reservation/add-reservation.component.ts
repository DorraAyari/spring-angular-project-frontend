import { Component } from '@angular/core';
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
  {
    
  }
  
  ngOnInit(): void {
    this.fetchAllRooms();
    this.fetchAllCINs();
    
   
  }

  addReservationToRoomAndStudent(): void {
    
    this.reservationService.ajouterReservationEtAssignerAChambreEtAEtudiant(this.reservation.numeroChambre, this.reservation.cin).subscribe(
      
      (reservation) => {
        console.log("Reservation added", reservation);
        alert('Nouvelle réservation ajoutée avec succès!');
        this.router.navigate(['/gestionreservation']);
      },
      (error)=>{
        console.log("Error adding reservation", error);
      }
    )
  }



    fetchAllRooms() {
      this.reservationService.getAllRooms().subscribe(
        (rooms)=>
        {
          this.allRooms = rooms;
          console.log("Rooms fetched successfully", rooms);
          console.log(this.allRooms);
          
        },
        (error)=>{
          console.log("Error fetching rooms", error);
        }
        
      )
    }

    fetchAllCINs() {
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
    }
  
   
  
 

}
