import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    // Initialize the form here
    this.reportForm = new FormGroup({
      // id: new FormControl(''),
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
    this.reservationService.getAllidRooms().subscribe(
      rooms => {
        this.allRooms = rooms; // Populate the allRooms array
      },
      error => console.error('Error fetching rooms', error)
    );
  }

  loadReportById(reportId: number): void {
    this.reportService.getReportById(reportId).subscribe(
      report => {
        this.reportForm.setValue({
        //  id: reportId,   // hedhi id Report from URL
          chambre: report.chambre.idChambre,   // hedhi id chambre
          problem: report.problem,
          description: report.description,
          dateReport: report.dateReport
        });
      },
      error => console.error('Error loading report', error)
    );
  }

  UpdateReport(): void {
    if (this.reportForm.valid) {
      console.log('reportForm Data:', this.reportForm.value);
      this.reportService.updateReport(this.reportId, this.reportForm.value).subscribe(
        response => {
          console.log('Report updated successfully', response);
          this.router.navigate(['/list']);
        },
        error => console.error('Error updating report', error)
      );
    }
  }
  
}