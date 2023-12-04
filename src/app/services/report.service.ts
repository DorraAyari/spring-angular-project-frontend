import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8088/reported';

  constructor(private http: HttpClient) {}

  // Get all reports
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/findAll`);
  }

  // Get a single report by ID
  getReportById(reportId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findById/${reportId}`);
  }

  // Create a new report
  createReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, reportData);
  }


  // Delete a report by ID
  deleteReport(reportId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${reportId}`);
  }

   // Update an existing report by ID
   updateReport(reportId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${reportId}`, updatedData);
  }

}
