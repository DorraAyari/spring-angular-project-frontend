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
import { ChambreModificationComponent } from './chambre-modification/chambre-modification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChambreAjouterComponent } from './chambre-ajouter/chambre-ajouter.component';
import { DataTablesModule } from 'angular-datatables';
import { AjouterUniversiteComponent } from './universite/ajouter-universite/ajouter-universite.component';
import { UniversiteService } from './services/universite.service';
import { ListeUniversitesComponent } from './universite/liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from './universite/details-universite/details-universite.component';
import { AddBlocComponent } from './manage-bloc/add-bloc/add-bloc.component';
import { DeleteBlocComponent } from './manage-bloc/delete-bloc/delete-bloc.component';
import { EditBlocComponent } from './manage-bloc/edit-bloc/edit-bloc.component';
import { ShowBlocComponent } from './manage-bloc/show-bloc/show-bloc.component';

import { EditFoyerComponent } from './foyer/edit-foyer/edit-foyer.component';
import { HomeFoyerComponent } from './foyer/home-foyer/home-foyer.component';
import { AddFoyerComponent } from './foyer/add-foyer/add-foyer.component';
import { FoyerService } from './services/foyer.service';

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
    AjouterUniversiteComponent,
    ListeUniversitesComponent,
    DetailsUniversiteComponent,

    AddBlocComponent,
    DeleteBlocComponent,
    EditBlocComponent,
    ShowBlocComponent,
    AddFoyerComponent,
    EditFoyerComponent,
    HomeFoyerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule

  ],
    ],
  providers: [

    FoyerService // Add this line

    ChambreService, // Add this line
    UniversiteService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
