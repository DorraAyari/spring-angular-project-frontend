import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre/chambre.component';

import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';

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
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [

  {path:'auth',component:LoginRegisterComponent},

  //Manage Users
  {path:'u',loadChildren:()=>import('../app/manageUser/module/manage-user/manage-user.module').then((t)=>t.ManageUserModule)},


  {path:'chambre',component:ChambreComponent,canActivate: [authGuard]},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent ,canActivate: [authGuard]},
  { path: 'chambre-ajouter', component: ChambreAjouterComponent,canActivate: [authGuard] },
  {path : 'ajouterUniversite', component : AjouterUniversiteComponent,canActivate: [authGuard]},
  {path : 'showUniversites' , component : ListeUniversitesComponent,canActivate: [authGuard]},
  {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent,canActivate: [authGuard]},
  {path : 'detailsUniversites' , component : DetailsUniversiteComponent,canActivate: [authGuard]},
  { path: 'gestionreservation', component: ReservationComponent },
  { path: 'confirmreservation', component: AddReservationComponent },
  { path: 'ajouterreservation', component: AddReservationComponent },



  {path:'bloc', component:ShowBlocComponent},
  {path:'bloc/:id',component:EditBlocComponent},
  {path:'add',component:AddBlocComponent},
  {path:'home',component:HomeComponent,canActivate: [authGuard]},

  {path:'foyer/home-foyer',component:HomeFoyerComponent,canActivate: [authGuard]},
  { path:'foyer/editFoyer/:id', component:EditFoyerComponent,canActivate: [authGuard] },
  { path:'foyer/add-foyer', component:AddFoyerComponent,canActivate: [authGuard] },



  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
