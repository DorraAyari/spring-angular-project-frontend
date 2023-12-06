import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {
  @Input() bloc : Bloc = {
    idBloc: 0,
    nomBloc: '',
    capaciteBloc: 0,
    foyer_id_foyer:0 // Initialize bloc
    // Ajoutez le champ isOccupee avec la valeur initiale
}  ;
  constructor(private service: BlocService, private router: Router){}
   //nasna3 fi evenement wahdek l evenement hedha yabeeoth data
 

 
   @Output() passId = new EventEmitter<number>();

   deleteBloc(id: number) {
     this.passId.emit(id);
   }
 
   detailBloc(id: number) {
     this.router.navigate(['/details', id]);
   }
 
   ngOnInit() {
   }
 }
