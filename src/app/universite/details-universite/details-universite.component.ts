import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    adresse:'',
    foyer  : {
      idFoyer: 0  ,
    nomFoyer:'' ,
    capaciteFoyer: 0
    } 
  }  

  
  nombreTotalChambres : number = 0 ;
  nombreMinChambres : number = 0 ;
  universites !: Universite[];
  


  constructor(
    private universiteService : UniversiteService,
    private router : Router
  ){}

  rechercherDetailsUniversite(): void {

    if (this.universiteDetails.idUniversite) {

      this.universiteService.getUniversiteById(this.universiteDetails.idUniversite).subscribe(
        (data : Universite) => {
          this.universiteDetails.adresse = data.adresse;
          this.universiteDetails.nomUniversite = data.nomUniversite;
        },
        (error) => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
      
    } else if(this.universiteDetails.nomUniversite){

      this.universiteService.getUniversByNomUnivers(this.universiteDetails.nomUniversite).subscribe(
        (data : Universite) => {
          this.universiteDetails.adresse = data.adresse;
          this.universiteDetails.nomUniversite = data.nomUniversite;
        },
        (error) => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
      
    } else if (this.universiteDetails.foyer?.nomFoyer) {
      this.universiteService.getUniversByNomFoyer(this.universiteDetails.foyer.nomFoyer).subscribe(
        (data: Universite) => {
          
          this.universiteDetails.adresse = data.adresse;
          this.universiteDetails.nomUniversite = data.nomUniversite;
          
        },
        (error) => {
          console.error('Une erreur s\'est produite : ', error);
        }
      );
    }
  }

  getStatistique() {
    this.universiteService
      .getNombreTotalChambres(this.universiteDetails.nomUniversite)
      .subscribe(
        (resultat) => (this.nombreTotalChambres = resultat),
        (erreur) => console.error('Erreur lors de la récupération de la statistique :', erreur)
      );
  }


  getUniversitesByNombreMinChambres(){

    if (this.nombreMinChambres) {
      this.universiteService.getByNombreMinChambres(this.nombreMinChambres).subscribe(
        universites => this.universites = universites,
        erreur => console.error('Erreur lors de la récupération des universités :', erreur)
      );
    }

  }

  goToList(){
    this.router.navigate(['/showUniversites'])

  }
    

    }

    
   
  

 


