import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './chambre/chambre.component';
import { BodyComponent } from './shared/body/body.component';
import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';


const routes: Routes = [
  {path:'chambre',component:ChambreComponent},
  {path:'',component:BodyComponent},
  { path: 'chambre-modification/:id', component: ChambreModificationComponent },
  { path: 'chambre-ajouter', component: ChambreAjouterComponent },
  {path:'bloc', component:ShowBlocComponent},
  {path:'bloc/:id',component:EditBlocComponent},
  {path:'add',component:AddBlocComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
