import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
declare var $: any; // Déclaration de $ pour éviter les erreurs de TypeScript

@Component({
  selector: 'app-home-foyer',
  templateUrl: './home-foyer.component.html',
  styleUrls: ['./home-foyer.component.css']
})
export class HomeFoyerComponent implements OnInit, AfterViewInit, OnDestroy {
  foyes: Foyer[] = [];
  showDeleteModal = false;
  foyerToDeleteId!: number;
  dataTablesInstance: any;
  nomFoyer: string = '';

  constructor(private foyerService: FoyerService, private router: Router) {}

  ngOnInit(): void {
    this.getFoyes();
  }

  ngAfterViewInit(): void {
    if (this.dataTablesInstance) {
      this.dataTablesInstance.destroy();
    }

    // Activer DataTables une fois que la vue a été initialisée
    this.dataTablesInstance = $('#foyesTable').DataTable({
      // Options DataTables here
      destroy: true,
      searching: false
    });
  }

  ngOnDestroy(): void {
    // Détruire DataTables lorsque le composant est détruit pour éviter les fuites de mémoire
    if (this.dataTablesInstance) {
      this.dataTablesInstance.destroy();
    }
  }

  getFoyes(): void {
    this.foyerService.getFoyes().subscribe((foyes) => (this.foyes = foyes));
  }
  searchFoyersByNomFoyer(): void {
    // Effectuer la recherche des foyers en utilisant this.nomFoyer comme critère de recherche
    if (this.nomFoyer.trim() !== '') {
      // Appeler le service de foyer pour effectuer la recherche
      this.foyerService.searchFoyersByNomFoyer(this.nomFoyer).subscribe(
        (foyers) => {
          // Formater les données comme un tableau bidimensionnel
          const formattedData = foyers.map(foyer => [foyer.nomFoyer, foyer.capaciteFoyer,]);
  
          // Détruire et recharger l'instance de DataTables avec les nouvelles données
          if (this.dataTablesInstance) {
            this.dataTablesInstance.clear();
            this.dataTablesInstance.rows.add(formattedData);
            this.dataTablesInstance.draw();
            this.dataTablesInstance.destroy();
          }
              
        },
        (error) => {
          console.error('Error searching foyers', error);
          // Gérer l'erreur selon vos besoins
        }
      );
    } else {
      // Si le champ de recherche est vide, afficher tous les foyers
      this.getFoyes();
    }
  }
  
  

  openModificationPopup(foyer: Foyer): void {
    // Naviguer vers la route de modification du foyer, en passant l'ID du foyer
    this.router.navigate(['foyer/editFoyer', foyer.idFoyer]);
  }

  deleteFoyer(idFoyer: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette foyer ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.foyerService.deleteFoyer(idFoyer).subscribe(
          () => {
            console.log('foyer deleted successfully');
            // Détruire l'instance de DataTables avant de recharger les données
            if (this.dataTablesInstance) {
              this.dataTablesInstance.destroy();
            }
            // Recharger les données de DataTables
            this.getFoyes();
          },
          (error) => {
            console.error('Error deleting foyer', error);
            // Gérer l'erreur selon vos besoins
          }
        );
      }
    });
  }

  // Fermer la fenêtre modale de confirmation
  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  navigateToAjouter(): void {
    this.router.navigate(['foyer/add-foyer']);
  }
}