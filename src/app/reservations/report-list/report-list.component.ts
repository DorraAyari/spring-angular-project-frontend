import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {

  reports: any[] = []; // list of reports initialisation

  newReport: any = {}; // new report initialisation

  constructor(private reportService: ReportService, private router: Router,private route: ActivatedRoute ){}

  ngOnInit(): void {
    this.loadReports();
  }

  // Read (List Reports)
  loadReports(): void { 
    this.reportService.getReports().subscribe(
      (res) => {
        this.reports = res;
      },
      (error) => {
        console.log('Error fetching reports', error);
      }
    );
  }

/* 
  // Add report
  addReport(): void {
    this.reportService.createReport(this.newReport).subscribe(
      (res) => {
        console.log('Report added successfully', res);
         // Navigate to the home page
         this.router.navigate(['/list']);
      },
      (error) => {
        console.log('Error adding report', error);
      }
    );
  } */

   // Delete (Remove Report)
   deleteReport(reportId: number): void {
    this.reportService.deleteReport(reportId).subscribe(
      (res) => {
        console.log('Report deleted successfully', res);
        this.loadReports(); // Refresh the list after deleting a report
      },
      (error) => {
        console.log('Error deleting report', error);
      }
    );
  }

  navigate(reportId: number): void {
    this.router.navigate([`/reporting/update/${reportId}`]);
  }


}
