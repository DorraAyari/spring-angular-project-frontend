import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BocRoutingRoutingModule } from './boc-routing-routing.module';
import { DetailComponent } from '../detail/detail.component';
import { DetailsBlocComponent } from '../details-bloc/details-bloc.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { AppComponent } from 'src/app/app.component';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BocRoutingRoutingModule,


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
export class BocRoutingModule { }
