import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Foyer } from 'src/app/models/foyer';
import { Universite } from 'src/app/models/universite';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  //universite : Universite;
  @Input() foyer : Foyer = {
    idFoyer:0,
    nomFoyer:'',
    capaciteFoyer:0
  }  ;
  nombreChambres: number = 0;
  constructor(private foyerService: FoyerService){}
   //nasna3 fi evenement wahdek l evenement hedha yabeeoth data 
   @Output() passId = new EventEmitter <number> () ;
   
  
    deleteFoye(idFoyer : number){
      this.passId.emit(idFoyer);
    }
    ngOnInit() {
      // Appeler la méthode pour récupérer le nombre de chambres lors de l'initialisation du composant
      this.foyerService.getCountChambresByFoyerId(this.foyer.idFoyer).subscribe(
        (count) => (this.nombreChambres = count),
        (error) => console.error(error)
      );
    

}
}