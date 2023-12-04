import { Component } from '@angular/core';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-details-universite',
  templateUrl: './details-universite.component.html',
  styleUrls: ['./details-universite.component.css']
})
export class DetailsUniversiteComponent {

  universiteDetails :   Universite = {
    idUniversite:0,
    nomUniversite:'',
    adresse:''
  }  ;

  constructor(
    private universiteService : UniversiteService,
  ){}

  rechercherDetailsUniversite(id: number): void {
    this.universiteService.getUniversiteById(id).subscribe(
      (data : Universite) => {
        this.universiteDetails = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

 

}
