import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyComponent } from './shared/body/body.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ChambreComponent } from './chambre/chambre.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ChambreService } from './services/chambre.service';
import { ChambreModificationComponent } from './chambre/chambre-modification/chambre-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreAjouterComponent } from './chambre/chambre-ajouter/chambre-ajouter.component';
import { DataTablesModule } from 'angular-datatables';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { ToastModule } from 'primeng/toast';

import { AcademicYearPipe } from './academic-year.pipe';
import { ReportingModule } from './reservations/reporting/reporting.module';

import { AjouterUniversiteComponent } from './universite/ajouter-universite/ajouter-universite.component';
import { UniversiteService } from './services/universite.service';
import { ListeUniversitesComponent } from './universite/liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from './universite/details-universite/details-universite.component';

import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { DeleteBlocComponent } from './manage-bloc/delete-bloc/delete-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';
import { UniversitesComponent } from './universite/universites/universites.component';
import { UniversitComponent } from './universite/universit/universit.component';
import { CouleurDirective } from './directive/couleur.directive';
import { MessageErreurComponent } from './shared/message-erreur/message-erreur.component';
import { HighlightDirective } from './directive/highlight.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { PopupComponent } from './universite/popup/popup.component';

import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EditFoyerComponent } from './foyer/edit-foyer/edit-foyer.component';
import { HomeFoyerComponent } from './foyer/home-foyer/home-foyer.component';
import { AddFoyerComponent } from './foyer/add-foyer/add-foyer.component';
import { FoyerService } from './services/foyer.service';
import { DetailsFoyerComponent } from './foyer/details-foyer/details-foyer.component';
import { DetailComponent } from './foyer/detail/detail.component';
import { CouleurDirective } from './foyer/CouleurDirective';
import { HighlightDirective } from './foyer/highlight.directive';
import { FoyerModule } from './foyer/foyer/foyer.module';

import { DetailsChambreComponent } from './chambre/details-chambre/details-chambre.component';
import { DetailComponent } from './chambre/detail/detail.component';
import { HighlightDirective } from './chambre/highlightDirective.component';


import { ManageUserModule } from './manageUser/module/manage-user/manage-user.module';
import { BarSideComponent } from './shared/bar-side/bar-side.component';



import { DetailComponent } from './chambre/detail/detail.component';
import { DetailsChambreComponent } from './chambre/details-chambre/details-chambre.component';
import { LoginRegisterComponent } from './Authentication/login-register/login-register.component';


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
    ReservationComponent,
    AddReservationComponent,
    AcademicYearPipe,
    AjouterUniversiteComponent,
    ListeUniversitesComponent,
    DetailsUniversiteComponent,


    AddFoyerComponent,
    EditFoyerComponent,
    HomeFoyerComponent,
    DetailsFoyerComponent,
    DetailComponent,
    SidebarComponent,
    NavbarComponent,

    DetailsChambreComponent,


    MessageErreurComponent,



    AddBlocComponent,
    DeleteBlocComponent,
    EditBlocComponent,
    HighlightDirective,
    ShowBlocComponent,
    UniversitesComponent,
    UniversitComponent,
    CouleurDirective,
    MessageErreurComponent,
    HighlightDirective,
    CapitalizePipe,
    PopupComponent,






    LoginRegisterComponent,
    HomeComponent,

   
    CouleurDirective,
    HighlightDirective

    AddFoyerComponent,
    EditFoyerComponent,
    HomeFoyerComponent,

    DetailComponent


    SidebarComponent,

    DetailComponent,
    DetailsChambreComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ToastModule,
    FoyerModule,BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ToastModule


    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}





  providers: [

    HttpClient,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


