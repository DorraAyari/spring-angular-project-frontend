import { Component } from '@angular/core';
import { Chambre } from '../../models/chambre';
import { ChambreService } from '../../services/chambre.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/manage-bloc/Service/bloc.service';

@Component({
  selector: 'app-chambre-ajouter',
  templateUrl: './chambre-ajouter.component.html',
  styleUrls: ['./chambre-ajouter.component.css']
})
export class ChambreAjouterComponent {
  bloc: Bloc[] = [];
  selectedBlocNom: string = '';

  newChambre: Chambre = {
    idChambre: 0,
    numeroChambre: 0,
    typeChambre: '',
    bloc: { idBloc: 0, nomBloc: '', capaciteBloc: 0 }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService,
    private blocService: BlocService
  ) {}

  ngOnInit() {
    // Récupérer les données des blocs depuis le service
    this.loadBlocs();
  }

  updateBlocId() {
    const selectedBloc = this.bloc.find(blocItem => blocItem.nomBloc === this.selectedBlocNom);
    console.log('Selected Bloc:', selectedBloc);

    if (selectedBloc) {
      this.newChambre.bloc = selectedBloc;
      console.log('Updated idBloc:', this.newChambre.bloc.idBloc);
    }
  }

  loadBlocs(): void {
    this.blocService.findAll().subscribe(
      (blocs: Bloc[]) => {
        this.bloc = blocs;
      },
      (error) => {
        console.error('Error fetching blocs', error);
        // Handle error as needed
      }
    );
  }

  ajouterChambre(): void {
    if (!this.newChambre.numeroChambre || !this.newChambre.typeChambre || !this.newChambre.bloc.idBloc) {
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
          this.newChambre = { idChambre: 0, numeroChambre: 0, typeChambre: '', bloc: { idBloc: 0, nomBloc: '', capaciteBloc: 0 } };
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
