import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChambreService } from 'src/app/services/chambre.service';
import { ReportService } from 'src/app/services/report.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-update-reports',
  templateUrl: './update-reports.component.html',
  styleUrls: ['./update-reports.component.css']
})
export class UpdateReportsComponent implements OnInit {

  reportForm: FormGroup;
  reportId!: number;
  allRooms: any[] = [];

  romm:any;
  data:any;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private reservationService: ReservationService,
    private router: Router,
    private roomService: ChambreService
  ) {
    // Initialize the form here
    this.reportForm = new FormGroup({
      chambre: new FormControl('', Validators.required),
      problem: new FormControl('', Validators.required),
      description: new FormControl(''),
      dateReport: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportId = +params['id']; // Correctly assign reportId
      this.loadReportById(this.reportId);
    });
    this.fetchAllRooms(); 
  }

  fetchAllRooms(): void {
    this.roomService.getChambres().subscribe(
      rooms => {
        this.allRooms = rooms; // Populate the allRooms array
      },
      error => console.error('Error fetching rooms', error)
    );
  }

  loadReportById(reportId: number): void {
    this.reportService.getReportById(reportId).subscribe(
      (data)=>{
        this.romm=data;
        console.log(this.romm);
        
        // lina set form values :
        /* this.reportForm.patchValue({
          idChambre : this.reportId,
          chambre: data.chambre.idChambre, 
          problem: data.problem,
          description: data.description,
          dateReport: data.dateReport 
        }); */
      },
      error => console.error('Error fetching ID', error)
    );
  }

  UpdateReport(): void {
    if (this.reportForm.valid) {
      console.log('reportForm Data:', this.reportForm.value);
      this.reportForm.value.id=this.reportId
      console.log(this.reportForm.value);
      
      this.reportService.updateReport(this.reportId, this.reportForm.value).subscribe(
        response => {
          console.log('Report updated successfully', response);
          this.router.navigate(['/reporting/list']);
        },
        error => console.error('Error updating report', error)
      );
    }
  } 

  /* UpdateReport(): void {
    if (this.reportForm.valid) {
      // Extract the form values
      const formValue = this.reportForm.value;
  
      // Construct the payload to match the expected API format
      const payload = {
        chambre: {
          idChambre: formValue.chambre // Assuming the chambre value is just the ID as a number
        },
        problem: formValue.problem,
        description: formValue.description,
        dateReport: formValue.dateReport
      };
  
      console.log('reportForm Data:', payload);
  
      this.reportService.updateReport(this.reportId, payload).subscribe(
        response => {
          console.log('Report updated successfully', response);
          this.router.navigate(['/reporting/list']);
        },
        error => console.error('Error updating report', error)
      );
    }
  } */
  
  
}