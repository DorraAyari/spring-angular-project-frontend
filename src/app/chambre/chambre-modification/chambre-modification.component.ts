import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChambreService } from 'src/app/services/chambre.service';
import { Chambre } from 'src/app/models/chambre';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from 'src/app/services/bloc.service';

@Component({
  selector: 'app-chambre-modification',
  templateUrl: './chambre-modification.component.html',
  styleUrls: ['./chambre-modification.component.css']
})
export class ChambreModificationComponent implements OnInit {

  chambre!: Chambre;
  bloc: Bloc[] = [];
  selectedBlocNom: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService,
    private blocService: BlocService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadChambre(id);
      this.loadBlocs();
    });
  }

  loadChambre(id: number): void {
    this.chambreService.getChambreById(id).subscribe(
      (chambre: Chambre) => {
        this.chambre = chambre;
        this.selectedBlocNom = String(chambre.bloc?.nomBloc || '');
        // or
        this.selectedBlocNom = (chambre.bloc?.nomBloc || '').toString();
              },
      (error) => {
        console.error('Error loading chambre', error);
      }
    );
  }

  loadBlocs(): void {
    this.blocService.findAll().subscribe(
      (blocs: Bloc[]) => {
        this.bloc = blocs;
      },
      (error) => {
        console.error('Error fetching blocs', error);
      }
    );
  }

  updateChambre(): void {
    // Similar to the ajoutChambre method, handle the selectedBlocNom
    const selectedBloc = this.bloc.find(b => b.nomBloc === this.selectedBlocNom);

    if (selectedBloc) {
      this.chambre.bloc = selectedBloc;
    }
    this.chambreService.updateChambre(this.chambre.idChambre, this.chambre).subscribe(
      (updatedChambre: Chambre) => {
        console.log('Chambre updated successfully', updatedChambre);
        Swal.fire({
          title: 'Succès!',
          text: 'Chambre mise à jour avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/chambre']);
        });
      },
      (error) => {
        console.error('Error updating chambre', error);

        if (error.status === 409) {
          // Le numéro de chambre n'est pas unique
          Swal.fire({
            title: 'Erreur!',
            text: 'Le numéro de chambre doit être unique.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la mise à jour de la chambre.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
}
   