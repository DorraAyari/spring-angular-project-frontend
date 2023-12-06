import { Component, createPlatform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { ReservationService } from 'src/app/services/reservation.service';


@Component({
  selector: 'app-report-room',
  templateUrl: './report-room.component.html',
  styleUrls: ['./report-room.component.css']
})
export class ReportRoomComponent {


  reportForm = new FormGroup({
    chambre: new FormControl(null, Validators.required), 
    problem: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9_ ]*$') //Description can only contain letters, numbers, and spaces.
    ]),
    dateReport: new FormControl('', Validators.required)
  });
  

  // chambre initialement vide
  allRooms: any[] = [];
  room: any = {};
  reportData : any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private reportService: ReportService
  ) { }
  
  ngOnInit(): void {
    this.fetchAllRooms();
  }


  fetchAllRooms(): void {
    this.reservationService.getAllidRooms().subscribe(
      (rooms)=>
      {
        this.allRooms = rooms;
        console.log("Rooms fetched successfully", rooms);  
      },
      (error)=>{
        console.log("Error fetching rooms", error);
      }
      
    )
  }
  


  onSubmit(): void {
    
      this.reportService.createReport(this.reportForm.value).subscribe(     
        res => {
          console.log('Report added successfully', res);
          this.router.navigate(['/list']);
        },
        error => {
          console.log('Error adding report', error);
          console.log(this.reportForm.value);
        }
      );
    } 




  }




