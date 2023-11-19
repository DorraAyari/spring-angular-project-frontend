import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyComponent } from './shared/body/body.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ChambreComponent } from './chambre/chambre.component';
import { HTTP_INTERCEPTORS, HttpClient ,HttpClientModule } from '@angular/common/http';
import { ChambreService } from './services/chambre.service';
import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { DataTablesModule } from 'angular-datatables';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { DeleteBlocComponent } from './manage-bloc/delete-bloc/delete-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { LoginRegisterComponent } from './Authentication/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    SidebarComponent,
    ChambreComponent,
    ChambreModificationComponent,
    ChambreAjouterComponent,
    AddBlocComponent,
    DeleteBlocComponent,
    EditBlocComponent,
    ShowBlocComponent,
    LoginRegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastModule
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [
    ChambreService, // Add this line
    HttpClient,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
