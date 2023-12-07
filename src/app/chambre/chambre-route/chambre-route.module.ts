import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambreRouteRoutingModule } from './chambre-route-routing.module';
import { ChambreComponent } from '../chambre.component';
import { ChambreModificationComponent } from '../chambre-modification/chambre-modification.component';
import { ChambreAjouterComponent } from '../chambre-ajouter/chambre-ajouter.component';
import { DetailsChambreComponent } from '../details-chambre/details-chambre.component';
import { NavbarComponent } from 'src/app/shared/navbar copy 2/navbar.component';
import { BarSideComponent } from 'src/app/shared/bar-side copy/bar-side.component';
import { DetailComponent } from '../detail/detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AppComponent } from 'src/app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgToastModule } from 'ng-angular-popup';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    ChambreComponent,
    ChambreModificationComponent,
    ChambreAjouterComponent,
    DetailsChambreComponent,
    DetailComponent,
    NavbarComponent,
    BarSideComponent
  ],
  imports: [
    CommonModule,
    ChambreRouteRoutingModule,
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
export class ChambreRouteModule {

}
