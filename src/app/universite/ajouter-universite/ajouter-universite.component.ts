import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { Foyer } from 'src/app/models/foyer';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-ajouter-universite',
  templateUrl: './ajouter-universite.component.html',
  styleUrls: ['./ajouter-universite.component.css']
})
export class AjouterUniversiteComponent implements OnInit{

  universite : Universite = {
    idUniversite:0,
    nomUniversite:'',
    adresse:'',
    foyer  : {
      idFoyer: 0 ,
    nomFoyer:'' ,
    capaciteFoyer: 0
    } 
  }  ;

   foyers: Foyer[] = [];
   @ViewChild(PopupComponent) popup!: PopupComponent;
   
   addUnivForm !: FormGroup ;
   title : String = 'Ajouter une nouvelle Université' ;
   id : any;
   

   

  constructor(
    private universitesService: UniversiteService,
    private router : Router,
    private activateRoute : ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    
    this.id = this.activateRoute.snapshot.params['id'] ;
      if (this.id) {
        this.title = 'Modifier Université';
        this.getUniversById();
      } ;

  }

  addUniversite() : void {

    if (this.id) {

      this.universitesService.updateUniversite(this.universite.idUniversite, this.universite).subscribe(
        (data: Universite) => {
          console.log('Universite updated successfully', data);
 
          // Swal.fire({
          //   title: 'Succès!',
          //   text: 'Université a été modifié avec succés',
          //   icon: 'success',
          //   confirmButtonText: 'OK'
          // }).then(() => {
          //   // Optionally, reload the chambre list or navigate to another route
          //   this.router.navigate(['/showUniversites']);
          // });
          this.popup.showPopup();
        },
        (error) => {
          console.error('Error updating chambre', error);
          // Handle error as needed
        }
      )
      
      
    } else {

      this.universitesService.saveUniversite(this.universite).subscribe(
        (response : Universite) => {
          console.log('add success',response);
          //alert("L'université a été ajouté avec succés");
        
        // Swal.fire({
        //   title: 'Succès!',
        //   text: 'Université a été ajouté avec succés',
        //   icon: 'success',
        //   confirmButtonText: 'OK'
        // }).then(() => {
        //   // Optionally, reload the chambre list or navigate to another route
        //   this.router.navigate(['/showUniversites']);

        //   // Reset the newChambre object for a new entry
        //   this.universite = {
        //   idUniversite:0, 
        //   nomUniversite:'',
        //   adresse:'' ,
        //   foyer  : {
        //     idFoyer: 0 ,
        //     nomFoyer:'' ,
        //     capaciteFoyer: 0
        //            }
        //  }
        // });
        this.popup.showPopup();
      },
        (error) => {
          console.error('Université erreur', error);
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'ajout de la chambre.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
  
        }
      );  
      
    }
   
  }

  getUniversById(){
    this.universitesService.getUniversiteById(this.id).subscribe(
      (data : Universite )=>{
         console.log("Get Univesite By Id",data) ;
         this.universite = data ;
        
       },
       (error) => {
         console.error('Error loading chambre', error);
       }
    );
   }


  navigateToListe(){
    this.router.navigateByUrl('/showUniversites');
    this.universite = {
      idUniversite:0, 
      nomUniversite:'',
      adresse:'' ,
      foyer  : {
        idFoyer: 0 ,
        nomFoyer:'' ,
        capaciteFoyer: 0
               }
     }
  }
   

}
