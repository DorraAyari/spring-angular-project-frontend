import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ajouter-universite',
  templateUrl: './ajouter-universite.component.html',
  styleUrls: ['./ajouter-universite.component.css']
})
export class AjouterUniversiteComponent implements OnInit{

  universite : Universite = {
    idUniversite:0,
    nomUniversite:'',
    adresse:''
  }  ;
  // addUnivForm !: FormGroup ;
  title : String = 'Ajouter Universite' ;
  id : any;

  constructor(
    private universitesService: UniversiteService,
    private router : Router,
    private activateRoute : ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'] ;
      if (this.id) {
        this.title = 'Modifier Universite';
        this.getUniversById();
      }
  }

  addUniversite() : void {

    if (this.id) {

      this.universitesService.updateUniversite(this.universite.idUniversite, this.universite).subscribe(
        (data: Universite) => {
          console.log('Universite updated successfully', data);
          alert("L'université a été modifié avec succès");
          this.router.navigate(['/showUniversites']);
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
          alert("L'université a été ajouté avec succés");
          this.router.navigate(['/showUniversites']);
         this.universite = {idUniversite:0, nomUniversite:'',adresse:''}
        },
        (error) => {
          console.error('Université erreur', error);
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

}
