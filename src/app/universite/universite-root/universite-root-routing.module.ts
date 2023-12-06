import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterUniversiteComponent } from '../ajouter-universite/ajouter-universite.component';
import { DetailsUniversiteComponent } from '../details-universite/details-universite.component';
import { UniversitesComponent } from '../universites/universites.component';
import { ListeUniversitesComponent } from '../liste-universites/liste-universites.component';

const routes: Routes = [{
  path: '',
  children: [
    {path : 'ajouterUniversite', component : AjouterUniversiteComponent},
    {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent},
    {path : 'detailsUniversites' , component : DetailsUniversiteComponent},
    {path : 'universites' , component : UniversitesComponent},
    { path : 'showUniversites' , component : ListeUniversitesComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRootRoutingModule { }
