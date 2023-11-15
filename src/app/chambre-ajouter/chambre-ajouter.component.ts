import { Component } from '@angular/core';
import { Chambre } from '../models/chambre';
import { ChambreService } from '../services/chambre.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

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

  // Handle the addition of a new chambre
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
        // Optionally, reload the chambre list or navigate to another route
        this.loadChambres();
        this.router.navigate(['/chambre']);

        // Reset the newChambre object for a new entry
        this.newChambre = { idChambre: 0, numeroChambre: 0, typeChambre: '' };
      },
      (error) => {
        console.error('Error adding chambre', error);
        // Handle error as needed
      }
    );
  }

  // Add the loadChambres method to reload the chambre list if needed
  loadChambres(): void {
    // Implement the method to load chambres from the service if needed
  }
}
