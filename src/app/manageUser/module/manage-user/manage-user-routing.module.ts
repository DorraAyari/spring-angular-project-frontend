import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowUsersComponent } from '../../show-users/show-users.component';
import { AddUserComponent } from '../../add-user/add-user.component';
import { UpdateUserComponent } from '../../update-user/update-user.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'user', component: ShowUsersComponent, children: [
      { path: 'addUser', component: AddUserComponent},
      //{ path: 'detail/:id', component: DetailUserComponent },
      //{ path: 'delete/:id', component: DeleteUserComponent },
      { path: 'updateUser', component: UpdateUserComponent},
    ]
  },
  {path: 'addUser', component: AddUserComponent,canActivate: [authGuard]},
  {path: 'showUser', component: ShowUsersComponent,canActivate: [authGuard]},
  {path: 'updateUser', component: UpdateUserComponent,canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
