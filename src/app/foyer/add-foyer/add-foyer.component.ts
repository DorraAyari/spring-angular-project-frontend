import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Foyer } from 'src/app/models/foyer';
import { Universite } from 'src/app/models/universite';
import { FoyerService } from 'src/app/services/foyer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.css']
})
export class AddFoyerComponent implements OnInit {

   foyer : Foyer = {
     idFoyer: 0,
     nomFoyer: '',
     capaciteFoyer: 0
   }
   addfoyerForm !: FormGroup ;
   title : String = 'Ajouter une nouvelle foyer' ;
   id : any;

   universities!: Universite[];
   selectuniversite!: number;



  constructor(
    private foyerService: FoyerService,
    private router : Router,
    private activateRoute : ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id) {
      this.title = 'Modifier Université';
      this.getFoyerById();
    }
    this.ajoute();  // Call the ajoute() method to fetch universities
  }




  addFoyer() : void {

    if (this.id) {

      this.foyerService.updateFoyer(this.foyer.idFoyer, this.foyer).subscribe(
        (data: Foyer) => {
          console.log('foyer updated successfully', data);

          Swal.fire({
            title: 'Succès!',
            text: 'foyer a été modifié avec succés',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally, reload the chambre list or navigate to another route
            this.router.navigate(['/home-foyer']);
          });
        },
        (error) => {
          console.error('Error updating', error);
          // Handle error as needed
        }
      )


    } else {

      this.foyerService.ajouterFoyer(this.foyer,this.selectuniversite).subscribe(
        (response : Foyer) => {
          console.log('add success',response);
          //alert("L'université a été ajouté avec succés");

        Swal.fire({
          title: 'Succès!',
          text: 'foyer a été ajouté avec succés',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, reload the chambre list or navigate to another route
          this.router.navigate(['/home-foyer']);

          // Reset the newChambre object for a new entry
          this.foyer = {
            idFoyer: 0,
            nomFoyer: '',
            capaciteFoyer: 0
         }
        });
        },
        (error) => {
          console.error('foyer erreur', error);
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
  ajoute(): void {
    this.foyerService.findAllUniversite().subscribe(data => {
      this.universities = data;
    });
  }

  getFoyerById(){
    this.foyerService.getFoyerById(this.id).subscribe(
      (data : Foyer )=>{
         console.log("Get Univesite By Id",data) ;
         this.foyer = data ;

       },
       (error) => {
         console.error('Error loading chambre', error);
       }
    );
   }

   goToHome() {
    this.router.navigate(['/home-foyer']); // Remplacez '/' par le chemin de votre page d'accueil si nécessaire
  }

  }
