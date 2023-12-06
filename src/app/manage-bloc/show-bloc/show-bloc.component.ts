import { Component, OnInit } from '@angular/core';
import { BlocService } from '../Service/bloc.service';
import { Bloc } from 'src/app/models/bloc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.css']
})
export class ShowBlocComponent implements OnInit {
  constructor(private service: BlocService, private router: Router) { }
  blocs!: Bloc[];
  nomBloc: string = '';
  capaciteBloc: number = 0;
  resultatsBlocs: any[] = [];

  ngOnInit(): void {
    this.service.findAll().subscribe(
      (d => {
        console.log(d)
        this.blocs = d;
      }
      ))
  }
  rechercherParNomBloc(event: Event) {
    event.preventDefault();
    console.log('Recherche en cours avec le nom :', this.nomBloc);
  
    if(this.nomBloc.trim() !== '') {
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
        // You might want to refresh the list of blocs after deletion
        this.ngOnInit();
      },
      error => {
        // Handle error scenarios
        console.error('Deletion failed', error);
        alert('Bloc deletion failed');
      }
    );
  }
  updateBloc(id: number) {
    this.router.navigate([`/bloc/${id}`]);
  }

  addBloc() {
    this.router.navigate(['/add']);
  }
 
  getBloc(): void {
    this.service.findAll().subscribe((bloc) => (this.blocs = bloc));
  }
  
}