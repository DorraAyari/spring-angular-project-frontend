import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversiteRootRoutingModule } from './universite-root-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AppComponent } from 'src/app/app.component';
import { AjouterUniversiteComponent } from '../ajouter-universite/ajouter-universite.component';
import { ListeUniversitesComponent } from '../liste-universites/liste-universites.component';
import { DetailsUniversiteComponent } from '../details-universite/details-universite.component';
import { UniversitesComponent } from '../universites/universites.component';
import { UniversitComponent } from '../universit/universit.component';
import { BarSideComponent } from 'src/app/shared/bar-side copy 2/bar-side.component';
import { NavbarComponent } from 'src/app/shared/navbar copy 3/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';
import { CapitalizePipe } from 'src/app/pipes copy/capitalize.pipe';


@NgModule({
  declarations: [
    AjouterUniversiteComponent,
    ListeUniversitesComponent,
    DetailsUniversiteComponent,
    UniversitesComponent,
    UniversitComponent,
    BarSideComponent,
    NavbarComponent,
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
    UniversiteRootRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgToastModule,
    MatSnackBarModule,
    ToastModule,
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
export class UniversiteRootModule { }
