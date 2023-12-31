import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowBlocComponent } from '../show-bloc/show-bloc.component';
import { AddBlocComponent } from '../add-bloc/add-bloc.component';
import { DetailsBlocComponent } from '../details-bloc/details-bloc.component';
import { EditBlocComponent } from '../edit-bloc/edit-bloc.component';
import { authGuard } from 'src/app/guards/auth.guard';
;

const routes: Routes = [
  {
    path: '', // Laissez cette route vide car c'est votre route parent
    children: [
      { path: '', component: ShowBlocComponent ,canActivate: [authGuard]},
      { path: 'bloc/:id', component: EditBlocComponent ,canActivate: [authGuard]},
      { path: 'add', component: AddBlocComponent,canActivate: [authGuard] },
      { path: 'details', component: DetailsBlocComponent ,canActivate: [authGuard]}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BocRoutingRoutingModule { }
