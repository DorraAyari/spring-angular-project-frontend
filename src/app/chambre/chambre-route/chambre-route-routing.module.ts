import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from '../chambre.component';
import { ChambreModificationComponent } from '../chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from '../chambre-ajouter/chambre-ajouter.component';
import { DetailsChambreComponent } from '../details-chambre/details-chambre.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{
  path: '',
  children: [
    {path:'',component:ChambreComponent,canActivate: [authGuard]},
    { path: 'chambre-modification/:id', component: ChambreModificationComponent,canActivate: [authGuard] },
    { path: 'chambre-ajouter', component: ChambreAjouterComponent,canActivate: [authGuard] },
    { path:'detailsChambre', component:DetailsChambreComponent ,canActivate: [authGuard]},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChambreRouteRoutingModule { }
