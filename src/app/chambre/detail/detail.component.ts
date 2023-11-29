import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chambre } from 'src/app/models/chambre';
import { ChambreService } from 'src/app/services/chambre.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() chambre : Chambre = {
    idChambre: 0,
    numeroChambre: 0,
    typeChambre: '',
    bloc: { idBloc: 0, nomBloc: '', capaciteBloc: 0 }, // Initialize bloc
    bloc_id_bloc: 0,
    isOccupied: false  // Ajoutez le champ isOccupee avec la valeur initiale
}  ;
  constructor(private chambreService: ChambreService){}
   //nasna3 fi evenement wahdek l evenement hedha yabeeoth data
   @Output() passId = new EventEmitter <number> () ;


    deleteChambre(idChambre : number){
      this.passId.emit(idChambre);
    }
    ngOnInit() {
    }

}
