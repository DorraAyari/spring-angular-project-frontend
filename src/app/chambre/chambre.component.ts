import { Component } from '@angular/core';
import { Chambre } from '../models/chambre';
import { ChambreService } from '../services/chambre.service';
import { ChambreModificationComponent } from '../chambre-modification/chambre-modification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent {
  chambres: Chambre[] = [];
  showDeleteModal = false;
  chambreToDeleteId!: number;

  constructor(private chambreService: ChambreService, private router: Router) {}

  ngOnInit(): void {
    this.getChambres();
  }

  getChambres(): void {
    this.chambreService.getChambres()
      .subscribe(chambres => this.chambres = chambres);
  }
  loadChambres(): void {
    this.chambreService.getChambres().subscribe(
      (chambres) => (this.chambres = chambres),
      (error) => {
        console.error('Error loading chambres:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }

 
  openModificationPopup(chambre: Chambre): void {
    // Navigate to the chambre modification route, passing the chambre ID
    this.router.navigate(['/chambre-modification', chambre.idChambre]);
  }
  

  deleteChambre(chambreId: number): void {
    if (confirm('Are you sure you want to delete this chambre?')) {
      this.chambreService.deleteChambre(chambreId).subscribe(
        () => {
          console.log('Chambre deleted successfully');
          // Optionally, reload the chambre list or handle it as needed
          this.loadChambres();
        },
        (error) => {
          console.error('Error deleting chambre', error);
          // Handle error as needed
        }
      );
    }
  }

  // Close the confirmation modal
  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  
  navigateToAjouter(): void {
    this.router.navigate(['/chambre-ajouter']);
  }
  getTypeChambreColor(typeChambre: string): string {
    switch (typeChambre) {
      case 'SIMPLE':
        return 'lightblue';
      case 'DOUBLE':
        return 'lightgreen';
      case 'TRIPLE':
        return 'lightcoral';
      default:
        return 'transparent';
    }
  }
}
