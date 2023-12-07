import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterUniversiteComponent } from '../ajouter-universite/ajouter-universite.component';
import { DetailsUniversiteComponent } from '../details-universite/details-universite.component';
import { UniversitesComponent } from '../universites/universites.component';
import { ListeUniversitesComponent } from '../liste-universites/liste-universites.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{
  path: '',
  children: [
    {path : 'ajouterUniversite', component : AjouterUniversiteComponent,canActivate: [authGuard]},
    {path : 'ajouterUniversite/:id', component : AjouterUniversiteComponent,canActivate: [authGuard]},
    {path : 'detailsUniversites' , component : DetailsUniversiteComponent,canActivate: [authGuard]},
    {path : 'universites' , component : UniversitesComponent,canActivate: [authGuard]},
    { path : 'showUniversites' , component : ListeUniversitesComponent,canActivate: [authGuard]},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRootRoutingModule { }
