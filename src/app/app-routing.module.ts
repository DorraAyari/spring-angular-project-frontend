import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre/chambre.component';

import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { ReportingModule } from './reservations/reporting/reporting.module';
import { ReportRoomComponent } from './reservations/report-room/report-room.component';
import { ReportListComponent } from './reservations/report-list/report-list.component';
import { UpdateReportsComponent } from './reservations/update-reports/update-reports.component';

import { AjouterUniversiteComponent } from './universite/ajouter-universite/ajouter-universite.component';
import { ListeUniversitesComponent } from './universite/liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from './universite/details-universite/details-universite.component';

import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { LoginRegisterComponent } from './Authentication/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { HomeFoyerComponent } from './foyer/home-foyer/home-foyer.component';
import { EditFoyerComponent } from './foyer/edit-foyer/edit-foyer.component';
import { AddFoyerComponent } from './foyer/add-foyer/add-foyer.component';

const routes: Routes = [
  {path:'chambre',component:ChambreComponent},
  {path:'auth',component:LoginRegisterComponent},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent },
  { path: 'chambre-ajouter', component: ChambreAjouterComponent },
  { path: 'gestionreservation', component: ReservationComponent },
  { path: 'ajouterreservation', component: AddReservationComponent },
/*   { path: 'reporting', component: ReportRoomComponent },
  { path: 'listreport', component: ReportListComponent }, 
  { path: 'updatereport/:id', component: UpdateReportsComponent },  */
  
  {
    path: 'reporting',
    loadChildren: () => import('./reservations/reporting/reporting.module').then(m => m.ReportingModule)
  },
 

  {path : 'ajouterUniversite', component : AjouterUniversiteComponent},
  {path : 'showUniversites' , component : ListeUniversitesComponent}, 
  {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent},
  {path : 'detailsUniversites' , component : DetailsUniversiteComponent},
 


  {path:'bloc', component:ShowBlocComponent},
  {path:'bloc/:id',component:EditBlocComponent},
  {path:'add',component:AddBlocComponent},
  {path:'home',component:HomeComponent,canActivate: [authGuard]},
  {path:'foyer/home-foyer',component:HomeFoyerComponent},
  { path:'foyer/editFoyer/:id', component:EditFoyerComponent },
  { path:'foyer/add-foyer', component:AddFoyerComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
