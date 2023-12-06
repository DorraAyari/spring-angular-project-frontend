import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BocRoutingRoutingModule } from './boc-routing-routing.module';
import { DetailComponent } from '../detail/detail.component';
import { DetailsBlocComponent } from '../details-bloc/details-bloc.component';


@NgModule({
  declarations: [
    DetailComponent,DetailsBlocComponent
  ],
  imports: [
    CommonModule,
    BocRoutingRoutingModule,
    
    
  ]
})
export class BocRoutingModule { }
