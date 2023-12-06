import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from '../chambre.component';
import { ChambreModificationComponent } from '../chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from '../chambre-ajouter/chambre-ajouter.component';
import { DetailsChambreComponent } from '../details-chambre/details-chambre.component';

const routes: Routes = [{
  path: '',
  children: [
    {path:'',component:ChambreComponent},
    { path: 'chambre-modification/:id', component: ChambreModificationComponent },
    { path: 'chambre-ajouter', component: ChambreAjouterComponent },
    { path:'detailsChambre', component:DetailsChambreComponent },

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChambreRouteRoutingModule { }
