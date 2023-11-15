import { Component } from '@angular/core';
import { Chambre } from '../models/chambre';
import { ChambreService } from '../services/chambre.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chambre-ajouter',
  templateUrl: './chambre-ajouter.component.html',
  styleUrls: ['./chambre-ajouter.component.css']
})
export class ChambreAjouterComponent {
  newChambre: Chambre = { idChambre: 0, numeroChambre: 0, typeChambre: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService
  ) { }
  // Other component methods

  ajouterChambre(): void {
    if (!this.newChambre.numeroChambre && !this.newChambre.typeChambre) {
      alert('Veuillez remplir le formulaire avant de soumettre.');
      return;
    }

    // Convert numeroChambre to a number before sending it to the service
    this.newChambre.numeroChambre = +this.newChambre.numeroChambre;

    this.chambreService.ajouterChambre(this.newChambre).subscribe(
      (addedChambre: Chambre) => {
        console.log('Chambre added successfully', addedChambre);

        // Show SweetAlert2 confirmation popup
        Swal.fire({
          title: 'Succès!',
          text: 'Chambre ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, reload the chambre list or navigate to another route
          this.loadChambres();
          this.router.navigate(['/chambre']);

          // Reset the newChambre object for a new entry
          this.newChambre = { idChambre: 0, numeroChambre: 0, typeChambre: '' };
        });
      },
      (error) => {
        console.error('Error adding chambre', error);

        // Show SweetAlert2 error popup
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'ajout de la chambre.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        // Handle error as needed
      }
    );
  }

  // Add the loadChambres method to reload the chambre list if needed
  loadChambres(): void {
    // Implement the method to load chambres from the service if needed
  }
}
