import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Foyer } from 'src/app/models/foyer';
import { Universite } from 'src/app/models/universite'; // Assurez-vous d'importer l'interface Universite
import { FoyerService } from 'src/app/services/foyer.service';
import { UniversiteService } from 'src/app/services/universite.service'; // Assurez-vous d'importer le service UniversiteService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.css']
})
export class AddFoyerComponent implements OnInit {
  universite: Universite[] = []; // Liste des universités

  newFoyer: Foyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: {
    idUniversite:0,
    nomUniversite:'',
    adresse:''  }};
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foyerService: FoyerService,
    private universiteService: UniversiteService // Injection du service UniversiteService
  ) { }

  ngOnInit(): void {
    // Charger la liste des universités lors de l'initialisation du composant
    this.universiteService.getAllUniversities().subscribe(
      (universites: Universite[]) => {
        this.universite = universites;
        console.log(this.universiteService.getAllUniversities()) ;
          },
      (error) => {
        console.error('Error loading universities', error);
        // Gérer l'erreur selon les besoins
      }
    );
  }

  ajouterFoyer(): void {
    if (!this.newFoyer.nomFoyer || !this.newFoyer.capaciteFoyer || this.newFoyer.universite === null) {
      alert('Veuillez remplir le formulaire avant de soumettre.');
      return;
    }

    this.newFoyer.capaciteFoyer = +this.newFoyer.capaciteFoyer;

    this.foyerService.ajouterFoyer(this.newFoyer).subscribe(
      (addedFoyer: Foyer) => {
        console.log('Foyer added successfully', addedFoyer);

        Swal.fire({
          title: 'Succès!',
          text: 'Foyer ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.loadFoyers();
          this.router.navigate(['foyer/home-foyer']);
          this.newFoyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0,  universite: {
            idUniversite:0,
            nomUniversite:'',
            adresse:''  } };
        });
      },
      (error) => {
        console.error('Error adding foyer', error);

        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'ajout de la foyer.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  loadFoyers(): void {
    // Implémentez la méthode pour charger les foyers depuis le service si nécessaire
  }
}
