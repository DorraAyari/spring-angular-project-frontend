import { Chambre } from '../models/chambre';
import { ChambreService } from '../services/chambre.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';



// Déclaration de $ pour éviter les erreurs de TypeScript

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit, AfterViewInit, OnDestroy {
  chambres: Chambre[] = [];
  showDeleteModal = false;
  chambreToDeleteId!: number;
  dataTablesInstance: any;

  constructor(private chambreService: ChambreService, private router: Router) {}

  ngOnInit(): void {
    this.getChambres();
  }

  ngAfterViewInit(): void {
    // Activer DataTables une fois que la vue a été initialisée
    this.dataTablesInstance = $('#chambresTable').DataTable({
      // Options DataTables ici
    });
  }

  ngOnDestroy(): void {
    // Détruire DataTables lorsque le composant est détruit pour éviter les fuites de mémoire
    if (this.dataTablesInstance) {
      this.dataTablesInstance.destroy();
    }
  }

  getChambres(): void {
    this.chambreService.getChambres()
      .subscribe(chambres => this.chambres = chambres);
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
          // Recharger les données DataTables
          this.dataTablesInstance.ajax.reload();
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
