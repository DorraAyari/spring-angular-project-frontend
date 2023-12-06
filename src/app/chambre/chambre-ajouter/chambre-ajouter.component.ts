import { Component, ChangeDetectorRef } from '@angular/core';
import { Chambre } from '../../models/chambre';
import { ChambreService } from '../../services/chambre.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-chambre-ajouter',
  templateUrl: './chambre-ajouter.component.html',
  styleUrls: ['./chambre-ajouter.component.css']
})
export class ChambreAjouterComponent {
  bloc: Bloc[] = [];
  selectedBlocNom: string = '';
  selectedBloc: Bloc;

  newChambre: Chambre = {
    idChambre: 0,
    numeroChambre: 0,
    typeChambre: '',
    bloc: { idBloc: 0, nomBloc: '', capaciteBloc: 0,foyer_id_foyer:0 },
    bloc_id_bloc: 0,
    isOccupied: false
  };

  constructor(
    private router: Router,
    private chambreService: ChambreService,
    private blocService: BlocService,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedBloc = { idBloc: 0, nomBloc: '', capaciteBloc: 0,foyer_id_foyer:0 };
  }

  ngOnInit() {
    this.loadBlocs();
    this.selectedBlocNom = this.bloc.length > 0 ? String(this.bloc[0].nomBloc) : '';
  }

  updateBlocId(event: any) {
    const selectedBlocValue: string = event.target.value.split(': ')[1];
    const selectedBloc = this.bloc.find(b => b.nomBloc === selectedBlocValue);

    if (selectedBloc) {
      this.selectedBloc = selectedBloc;
      this.selectedBlocNom = selectedBlocValue;
    }
  }

  loadBlocs(): void {
    this.blocService.findAll().subscribe(
      (blocs: Bloc[]) => {
        this.bloc = blocs;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching blocs', error);
      }
    );
  }

  ajouterChambre(): void {
    if (!this.newChambre.numeroChambre || !this.newChambre.typeChambre) {
      alert('Veuillez remplir le formulaire avant de soumettre.');
      return;
    }

    // Set the selected Bloc directly
    this.newChambre.bloc = this.selectedBloc;

    const chambreToAdd: Chambre = {
      idChambre: this.newChambre.idChambre,
      numeroChambre: +this.newChambre.numeroChambre,
      typeChambre: this.newChambre.typeChambre,
      bloc: this.newChambre.bloc,
      bloc_id_bloc: this.newChambre.bloc?.idBloc || 0,
      isOccupied: false
    };

    this.chambreService.ajouterChambre(chambreToAdd).subscribe(
      (chambreToAdd: Chambre) => {
        console.log('Chambre added successfully', chambreToAdd);
        Swal.fire({
          title: 'Succès!',
          text: 'Chambre ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/chambre']);
          this.newChambre = {
            idChambre: 0,
            numeroChambre: 0,
            typeChambre: '',
            bloc: { idBloc: 0, nomBloc: '', capaciteBloc: 0 ,foyer_id_foyer:0},
            bloc_id_bloc: 0,
            isOccupied: false
          };
        });
      },
      (error) => {
        console.error('Error adding chambre', error);

        if (error.status === 409) {
          Swal.fire({
            title: 'Erreur!',
            text: 'Le numéro de chambre doit être unique.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else if (error.status === 200) {
          Swal.fire({
            title: 'Succès!',
            text: 'Chambre mise à jour avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/chambre']);
          });
        }
      }
    );
  }
}
