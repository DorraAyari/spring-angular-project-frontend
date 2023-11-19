import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BodyComponent } from './shared/body/body.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ChambreComponent } from './chambre/chambre.component';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { ChambreService } from './services/chambre.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { DataTablesModule } from 'angular-datatables';
import { ReservationComponent } from './reservations/reservation/reservation.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [
    ChambreService, // Add this line

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
