import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFoyerComponent } from '../home-foyer/home-foyer.component';
import { EditFoyerComponent } from '../edit-foyer/edit-foyer.component';
import { AddFoyerComponent } from '../add-foyer/add-foyer.component';
import { DetailsFoyerComponent } from '../details-foyer/details-foyer.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{
  path: '',
  children: [
    {path:'',component:HomeFoyerComponent},
    { path:'editFoyer/:id', component:EditFoyerComponent,canActivate: [authGuard]},
    { path:'add-foyer', component:AddFoyerComponent,canActivate: [authGuard] },
    { path:'detailsFoyer', component:DetailsFoyerComponent,canActivate: [authGuard] },
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
