import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportRoomComponent } from '../report-room/report-room.component';
import { ReportListComponent } from '../report-list/report-list.component';
import { UpdateReportsComponent } from '../update-reports/update-reports.component';



/* const routes: Routes = [
  { path: '',component: ReportRoomComponent}, // for : /reporting
  { path: 'list', component: ReportListComponent }, //for : /reporting/list
  { path: 'update/:id', component: UpdateReportsComponent },// for :  /reporting/update/:id
]; */

 const routes: Routes = [{
  path: '',
  children: [
    { path: '',component: ReportRoomComponent}, // for : /reporting
    { path: 'list', component: ReportListComponent }, //for : /reporting/list
    { path: 'update/:id', component: UpdateReportsComponent },// for :  /reporting/update/:id
  ]
}
]; 



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
