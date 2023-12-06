import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre/chambre.component';

import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { AjouterUniversiteComponent } from './universite/ajouter-universite/ajouter-universite.component';
import { ListeUniversitesComponent } from './universite/liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from './universite/details-universite/details-universite.component';

import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { LoginRegisterComponent } from './Authentication/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [

  {path:'f',loadChildren:()=>import('../app/foyer/foyer/foyer.module').then((t)=>t.FoyerModule)},
  {path:'chambre',component:ChambreComponent},
  {path:'auth',component:LoginRegisterComponent},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent },
  { path: 'chambre-ajouter', component: ChambreAjouterComponent },
  {path : 'ajouterUniversite', component : AjouterUniversiteComponent,canActivate: [authGuard]},
  {path : 'showUniversites' , component : ListeUniversitesComponent,canActivate: [authGuard]}, 
  {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent,canActivate: [authGuard]},
  {path : 'detailsUniversites' , component : DetailsUniversiteComponent,canActivate: [authGuard]},
 


  {path:'bloc', component:ShowBlocComponent},
  {path:'bloc/:id',component:EditBlocComponent},
  {path:'add',component:AddBlocComponent},
  {path:'home',component:HomeComponent,canActivate: [authGuard]},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
