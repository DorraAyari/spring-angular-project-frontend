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

const routes: Routes = [
  {path:'chambre',component:ChambreComponent},
  {path:'',component:BodyComponent},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent },
  { path: 'chambre-ajouter', component: ChambreAjouterComponent },
  {path : 'ajouterUniversite', component : AjouterUniversiteComponent},
  {path : 'showUniversites' , component : ListeUniversitesComponent}, 
  {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent},
  {path : 'detailsUniversites' , component : DetailsUniversiteComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
