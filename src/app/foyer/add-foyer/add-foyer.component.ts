import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Foyer } from 'src/app/models/foyer';

import { FoyerService } from 'src/app/services/foyer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-foyer',
  templateUrl: './add-foyer.component.html',
  styleUrls: ['./add-foyer.component.css']
})
export class AddFoyerComponent {
  newFoyer: Foyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foyerService: FoyerService
  ) { }
  // Other component methods

  ajouterFoyer(): void {
    if (!this.newFoyer.nomFoyer && !this.newFoyer.capaciteFoyer) {
      alert('Veuillez remplir le formulaire avant de soumettre.');
      return;
    }

    // Convert numeroChambre to a number before sending it to the service
    this.newFoyer.capaciteFoyer = +this.newFoyer.capaciteFoyer;

    this.foyerService.ajouterFoyer(this.newFoyer).subscribe(
      (addedFoyer: Foyer) => {
        console.log('Foyer added successfully', addedFoyer);

        // Show SweetAlert2 confirmation popup
        Swal.fire({
          title: 'Succès!',
          text: 'Foyer ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, reload the chambre list or navigate to another route
          this.loadFoyes();
          this.router.navigate(['foyer/home-foyer']);

          // Reset the newChambre object for a new entry
          this.newFoyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0 };
        });
      },
      (error) => {
        console.error('Error adding foyer', error);

        // Show SweetAlert2 error popup
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'ajout de la foyer.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        // Handle error as needed
      }
    );
  }

  // Add the loadChambres method to reload the chambre list if needed
  loadFoyes(): void {
    // Implement the method to load chambres from the service if needed
  }
}
