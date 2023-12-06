import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportRoomComponent } from '../report-room/report-room.component';
import { ReportListComponent } from '../report-list/report-list.component';
import { UpdateReportsComponent } from '../update-reports/update-reports.component';
import { ReportingRoutingModule } from './reporting-routing.module';

@NgModule({
  declarations: [
    ReportRoomComponent,
    ReportListComponent,
    UpdateReportsComponent,
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class ReportingModule { }
