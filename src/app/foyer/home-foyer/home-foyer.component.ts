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
export class HomeFoyerComponent implements OnInit, AfterViewInit {
  foyer : Foyer[] = [] ;
  dataTablesInstance: any ;
  rechercherParNom: boolean = false;
  nomRecherchee: Foyer['nomFoyer'] = '' ;
  

  constructor(
    private router : Router,
    private foyerService : FoyerService
  ){}

  ngOnInit(): void {
    
    this.getFoyes();
  }

  ngAfterViewInit(): void {
    this.dataTablesInstance = $('#foyerTable').DataTable({});
    
  }

  getFoyes(){
    this.foyerService.getFoyes().subscribe(
      reponse => this.foyer = reponse 
    )
  }

  deleteFoyer(idFoyer : number){

    if (confirm('Are you sure you want to delete this foyer ?')) {
      this.foyerService.deleteFoyer(idFoyer).subscribe(
        () => {
          alert("foyer deleted");
          console.log('foyer deleted successfully');
          // Recharger les données DataTables
          this.dataTablesInstance.ajax.reload();
          this.getFoyes();
        },
        (error) => {
          console.error('Error deleting foyer', error);
          // Handle error as needed
        }
      );
    }

  }


  navigateTo(id : number){
    this.router.navigate(['editFoyer/'+id]);
  }

  navigateToDetails(){
    this.router.navigate(['detailsFoyer'])
  }


  navigateToAjouter(){
    this.router.navigate(['add-foyer']);
  }

  rechercherParNomm(): void {
    if (this.nomRecherchee) {
      this.foyerService.searchFoyersByNomFoyer(this.nomRecherchee).subscribe(
        reponse => this.foyer = reponse 
      );
    }
  }

  annulerRecherche(): void {
    this.nomRecherchee = '';
    this.getFoyes() // Réinitialisez la liste filtrée avec toutes les universités
  }
}