import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import { PopupComponent } from '../popup/popup.component';
import Swal from 'sweetalert2';

declare var $: any; 



@Component({
  selector: 'app-liste-universites',
  templateUrl: './liste-universites.component.html',
  styleUrls: ['./liste-universites.component.css']
})
export class ListeUniversitesComponent implements OnInit{

  universites : Universite[] = [] ;
  dataTablesInstance: any ;
  rechercheParAdresse: boolean = false;
  adresseRecherchee: Universite['adresse'] = '' ;
  //universitesFiltrees: Universite[] = [];

  // @Output() componentReady = new EventEmitter<void>();
  @ViewChild(PopupComponent) popup!: PopupComponent;

  constructor(
    private router : Router,
    private universiteService : UniversiteService
  ){}

  ngOnInit(): void {
    
    
    this.getUniversites();
  }

 
  
  // ngAfterViewInit(): void {
  //   // Émettre un événement pour indiquer que le composant est prêt
  //   this.componentReady.emit();
  // }

  //configure DataTables pour la table avec l'ID universitesTable

  // ngAfterViewInit(): void {
  //   this.dataTablesInstance = $('#universiteTable').DataTable({});
  // }

  getUniversites(){
    this.universiteService.getAllUniversities().subscribe(
      reponse => this.universites = reponse 
    )
  }

  deleteUniversite(idUniversite : number){

    if (confirm('Are you sure you want to delete this université ?')) {
      this.universiteService.deleteUniversite(idUniversite).subscribe(
        () => {
          console.log('université deleted successfully');
          
          // Swal.fire({
          //   title: 'Succès!',
          //   text: 'Université a été supprimé avec succés',
          //   icon: 'success',
          //  confirmButtonText: 'OK'
          // }).then(() => {
          //   // recharger les données de la table DataTables. Cela garantit que la table est mise à jour
          //   // avec les dernières données après la suppression d'une université.
          //  // this.dataTablesInstance.ajax.reload();
          //   this.getUniversites();
          // // this.router.navigate(['/showUniversites']);
          // });
          this.popup.showPopup();
        },
        (error) => {
          console.error('Error deleting université', error);
          // Handle error as needed
        }
      );
    }

  }

  navigateTo(id : number){
    this.router.navigate(['/ajouterUniversite/'+id]);
  }

  navigateToAjouter(){
    console.log("*******");
    
    this.router.navigate(['/ajouterUniversite']);
    //http://localhost:4200/showUniversites/ajouterUniversite 

  }

  rechercherParAdresse(): void {
    if (this.adresseRecherchee) {
      this.universiteService.getUniversByAdresse(this.adresseRecherchee).subscribe(
        reponse => this.universites = reponse 
      );
    }
  }

  annulerRecherche(): void {
    this.adresseRecherchee = '';
    this.getUniversites() // Réinitialisez la liste filtrée avec toutes les universités
  }

  navigateToDetails(){
    this.router.navigate(['/detailsUniversites']);

  }
 

  navigateToUniversites(){
    this.router.navigate(['/universites']);
  }

}
