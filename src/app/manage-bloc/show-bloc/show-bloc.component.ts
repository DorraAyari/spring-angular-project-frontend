import { Component, OnInit } from '@angular/core';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from 'src/app/models/bloc';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/models/foyer';
import { ActivatedRoute } from '@angular/router'; // Ajout de l'import pour ActivatedRoute

@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.css']
})
export class ShowBlocComponent implements OnInit {
  constructor(
    private service: BlocService,
    private router: Router,
    private route: ActivatedRoute // Injection de ActivatedRoute
  ) { }

  blocs!: Bloc[];
  foyer: Foyer[] = [];
  nomBloc: string = '';
  capaciteBloc: number = 0;
  resultatsBlocs: any[] = [];

  ngOnInit() {
    this.service.findAll().subscribe(blocs => {
      this.blocs = blocs;

      // Vous pouvez également mettre à jour les Foyers après le tri
      this.blocs.forEach(bloc => {
        this.service.getFoyerByBloc(bloc.idBloc)
          .subscribe(foyer => {
            bloc.foyer = foyer;
          });
      });
    });
  }

  sortByCapacity() {
    this.blocs = this.service.sortByCapacity(this.blocs);
  }

  rechercherParNomBloc(event: Event) {
    event.preventDefault();
    console.log('Recherche en cours avec le nom :', this.nomBloc);

    if (this.nomBloc.trim() !== '') {
      // Appelez la fonction du service pour rechercher par nom de bloc
      this.service.findByNomBloc(this.nomBloc).subscribe(
        (blocs) => {
          // Assurez-vous que blocs est un tableau
          this.resultatsBlocs = Array.isArray(blocs) ? blocs : [blocs];
        },
        (error) => {
          console.error('Erreur lors de la recherche des blocs par nom', error);
          // Gérez l'erreur selon vos besoins
        }
      );
    } else {
      // Si le champ de recherche est vide, réinitialisez les résultats
      this.resultatsBlocs = [];
    }
  }

  deleteBloc(id: number) {
    this.service.deleteBloc(id).subscribe(
      () => {
        alert('Bloc deleted successfully');
        // Vous voudrez peut-être actualiser la liste des blocs après la suppression
        this.ngOnInit();
      },
      error => {
        // Gérer les scénarios d'erreur
        console.error('Deletion failed', error);
        alert('Bloc deletion failed');
      }
    );
  }

  updateBloc(id: number) {
    this.router.navigate([`bloc/bloc/${id}`]);
  }

  addBloc() {
    this.router.navigate(['bloc/add']);
  }

  getBloc(): void {
    this.service.findAll().subscribe((bloc) => (this.blocs = bloc));
  }

  detailBloc() {
    this.router.navigate([`bloc/details`]);
  }
}
