import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyerRoutingModule } from './foyer-routing.module';
import { DetailsFoyerComponent } from '../details-foyer/details-foyer.component';
import { HomeFoyerComponent } from '../home-foyer/home-foyer.component';
import { EditFoyerComponent } from '../edit-foyer/edit-foyer.component';
import { AddFoyerComponent } from '../add-foyer/add-foyer.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { NgToastModule } from 'ng-angular-popup';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DetailComponent } from '../detail/detail.component';
import { SidebarComponent } from 'src/app/shared/sidebar-foyer/sidebar.component';
import { NavbarComponent } from 'src/app/shared/navbar-foyer/navbar.component';


@NgModule({
  declarations: [

   /* AddFoyerComponent,
    EditFoyerComponent,
    HomeFoyerComponent,
    DetailsFoyerComponent,
    DetailComponent,
    SidebarComponent,
    NavbarComponent*/
  ],
  imports: [
    CommonModule,
    FoyerRoutingModule,
    /*BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastModule*/
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
 

],

  
providers: [

  HttpClient,{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
},
  
],
bootstrap: [AppComponent]
})
export class FoyerModule { }
