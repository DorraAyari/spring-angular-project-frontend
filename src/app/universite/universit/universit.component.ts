import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Universite } from 'src/app/models/universite';

@Component({
  selector: 'app-universit',
  templateUrl: './universit.component.html',
  styleUrls: ['./universit.component.css']
})
export class UniversitComponent {

 @Input() universite : Universite = {
  idUniversite:0,
  nomUniversite:'',
  adresse:'',
  foyer  : {
    idFoyer: 0 ,
  nomFoyer:'' ,
  capaciteFoyer: 0
  } 
}  ;
 
 @Output() passId = new EventEmitter <number> () ;
 

  deleteUnivers(idUniversite : number){
    this.passId.emit(idUniversite);
  }

}
