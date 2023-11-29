import { Chambre } from '../models/chambre';
import { ChambreService } from '../services/chambre.service';
import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Bloc } from '../models/bloc';

declare var $: any; // Déclaration de $ pour éviter les erreurs de TypeScript

<<<<<<< HEAD
// Déclaration de $ pour éviter les erreurs de TypeScript
=======
import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appCustomDirective(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
>>>>>>> b2a7a6d (fonctionnalités avancés)

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css'],
  template: `
    <button (click)="checkChambreOccupation(1)">Vérifier Occupation</button>
    <div *appCustomDirective="chambres.length > 0">
      <!-- Content to display when chambres array is not empty -->
      <table>
        <!-- ... your table content ... -->
      </table>
    </div>
    <div *ngIf="chambres.length === 0">
      No chambres available.
    </div>
  `,
})

export class ChambreComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  chambres: Chambre[] = [];
  showDeleteModal = false;
  chambreToDeleteId!: number;
  dataTablesInstance: any;
  numeroChambreSearch: number | undefined;

  constructor(
    private chambreService: ChambreService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
    };

    this.dataTablesInstance = $('#chambresTable').DataTable();

    this.getChambres();
    this.verifyOccupationForAllChambres();
  }

  ngAfterViewInit(): void {
    if (this.dataTablesInstance) {
      this.dataTablesInstance.destroy();
    }

    // Activer DataTables une fois que la vue a été initialisée
    this.dataTablesInstance = $('#chambresTable').DataTable();
  }
  updateDataTables(): void {
    if (!this.dataTablesInstance) {
      this.dataTablesInstance = $('#chambresTable').DataTable();
    }

    this.dataTablesInstance.clear();
    this.dataTablesInstance.rows.add(this.chambres);
    this.dataTablesInstance.draw();
  }

  searchChambreByNumeroChambre(): void {
    if (this.numeroChambreSearch !== undefined) {
      this.chambreService
        .searchChambreByNumeroChambre(this.numeroChambreSearch)
        .subscribe((response: any) => {
          if (Array.isArray(response)) {
            this.chambres = response;
          } else {
            this.chambres = [response];
          }

          // Actualiser le DataTable avec les nouvelles données
          if (this.dataTablesInstance) {
            this.dataTablesInstance.clear();
            this.dataTablesInstance.rows.add(this.chambres);
            this.dataTablesInstance.draw();
            this.cdRef.detectChanges(); // Ajoutez cette ligne
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Détruire DataTables lorsque le composant est détruit pour éviter les fuites de mémoire
    if (this.dataTablesInstance) {
      this.dataTablesInstance.clear().destroy();
    }
    if (this.dtElement) {
      this.dtTrigger.unsubscribe();
    }
  }

  getChambres(): void {
    this.chambreService.getChambres().subscribe((chambres) => {
      console.log('Chambres:', chambres);

      this.chambres = chambres.map((chambre) => ({
        ...chambre,
        isOccupied: chambre.isOccupied !== null ? chambre.isOccupied : false,
      }));

      // Vérifiez l'occupation pour chaque chambre lors de la récupération des données
      this.chambres.forEach((chambre) => {
        this.verifyOccupation(chambre.idChambre);

        this.chambreService.getBlocByChambre(chambre.idChambre).subscribe(
          (bloc: Bloc) => {
            // Assign the retrieved bloc to the chambre
            chambre.bloc = bloc;
          },
          (error) => {
            console.error('Error fetching bloc for chambre', error);
            // Handle error as needed
          }
        ); // Remove the extra comma here
      });

      // Update the DataTable with the new data
      this.updateDataTables();
    });
  }

  checkChambreOccupation(chambreId: number): void {
    this.chambreService
      .isChambreOccupee(chambreId)
      .subscribe((result: boolean) => {
        console.log(`Chambre ${chambreId} is occupied: ${result}`);

        // Mettez à jour la propriété isOccupied de la chambre
        const chambreToUpdate = this.chambres.find(
          (chambre) => chambre.idChambre === chambreId
        );
        if (chambreToUpdate) {
          chambreToUpdate.isOccupied = result;

          // Mettez à jour le DataTable avec les nouvelles données
          this.updateDataTables();
        }

        // Vérifiez si le résultat est true ou false pour afficher "Oui" ou "Non"
        const occupationStatus = result ? 'Oui' : 'Non';
        console.log(
          `Chambre ${chambreId} occupation status: ${occupationStatus}`
        );
      });
  }

  verifyOccupationForAllChambres(): void {
    this.chambres.forEach((chambre) => {
      this.chambreService
        .isChambreOccupee(chambre.idChambre)
        .subscribe((result: boolean) => {
          chambre.isOccupied = result;
        });
    });

    // Mettez à jour le DataTable avec les nouvelles données
    this.updateDataTables();
  }

  verifyOccupation(chambreId: number): void {
    this.chambreService
      .isChambreOccupee(chambreId)
      .subscribe((result: boolean) => {
        console.log(`Chambre ${chambreId} is occupied: ${result}`);

        // Mettez à jour la propriété isOccupied de la chambre
        const chambreToUpdate = this.chambres.find(
          (chambre) => chambre.idChambre === chambreId
        );
        if (chambreToUpdate) {
          chambreToUpdate.isOccupied = result;

          // Mettez à jour le DataTable avec les nouvelles données
          this.updateDataTables();
        }
      });
  }

  openModificationPopup(chambre: Chambre): void {
    // Navigate to the chambre modification route, passing the chambre ID
    this.router.navigate(['/chambre-modification', chambre.idChambre]);
  }
  navigateToDetails(){
    this.router.navigate(['detailsChambre'])
  }
  deleteChambre(chambreId: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette chambre ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chambreService.deleteChambre(chambreId).subscribe(
          () => {
            console.log('Chambre deleted successfully');
            // Recharger les données DataTables
            if (this.dataTablesInstance) {
              this.dataTablesInstance.destroy();
            }
            // Reload DataTables data
            this.getChambres();
          },
          (error) => {
            console.error('Error deleting chambre', error);
            // Handle error as needed
          }
        );
      }
    });
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
