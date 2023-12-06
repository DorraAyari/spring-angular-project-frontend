import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre/chambre.component';
import { BodyComponent } from './shared/body/body.component';
import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { AjouterUniversiteComponent } from './universite/ajouter-universite/ajouter-universite.component';
import { ListeUniversitesComponent } from './universite/liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from './universite/details-universite/details-universite.component';
import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { UniversitesComponent } from './universite/universites/universites.component';


const routes: Routes = [
  {path:'chambre',component:ChambreComponent},
  {path:'',component:BodyComponent},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent },
  { path: 'chambre-ajouter', component: ChambreAjouterComponent },
 
  {path:'bloc', component:ShowBlocComponent},
  {path:'bloc/:id',component:EditBlocComponent},
  {path:'add',component:AddBlocComponent},


 // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'ajouterUniversite', component : AjouterUniversiteComponent},
  {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent},
  {path : 'detailsUniversites' , component : DetailsUniversiteComponent},
  {path : 'universites' , component : UniversitesComponent},
  { path : 'showUniversites' , component : ListeUniversitesComponent},


  // {
  //   path : 'showUniversites' , component : ListeUniversitesComponent , children : [
  //     {path : 'ajouterUniversite', component : AjouterUniversiteComponent},
  //     {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent},
  //     {path : 'detailsUniversites' , component : DetailsUniversiteComponent},
  //     {path : 'universites' , component : UniversitesComponent}
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
