import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ShowUsersComponent } from '../../show-users/show-users.component';
import { AddUserComponent } from '../../add-user/add-user.component';
import { UpdateUserComponent } from '../../update-user/update-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/navbar copy/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { BarSideComponent } from 'src/app/shared/bar-side/bar-side.component';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AppComponent } from 'src/app/app.component';


@NgModule({
  declarations: [
    ShowUsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    NavbarComponent,
    BarSideComponent
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgToastModule,
    MatSnackBarModule,
    ToastModule,
  ],
  schemas: [

  CUSTOM_ELEMENTS_SCHEMA
  ],



providers: [
  {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
],
bootstrap: [AppComponent]
})
export class ManageUserModule { }
