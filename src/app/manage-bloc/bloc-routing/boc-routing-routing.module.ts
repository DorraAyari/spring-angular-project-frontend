import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowBlocComponent } from '../show-bloc/show-bloc.component';
import { AddBlocComponent } from '../add-bloc/add-bloc.component';
import { DetailsBlocComponent } from '../details-bloc/details-bloc.component';
import { EditBlocComponent } from '../edit-bloc/edit-bloc.component';
;

const routes: Routes = [
  {
    path: '', // Laissez cette route vide car c'est votre route parent
    children: [
      { path: '', component: ShowBlocComponent },
      { path: 'bloc/:id', component: EditBlocComponent },
      { path: 'add', component: AddBlocComponent },
      { path: 'details', component: DetailsBlocComponent } // Assurez-vous que cette route pointe vers le composant correct
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BocRoutingRoutingModule { }
