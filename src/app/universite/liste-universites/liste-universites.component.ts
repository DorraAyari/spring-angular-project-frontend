import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';

declare var $: any; 

@Component({
  selector: 'app-liste-universites',
  templateUrl: './liste-universites.component.html',
  styleUrls: ['./liste-universites.component.css']
})
export class ListeUniversitesComponent implements OnInit, AfterViewInit{

  universites : Universite[] = [] ;
  dataTablesInstance: any ;

  constructor(
    private router : Router,
    private universiteService : UniversiteService
  ){}

  ngOnInit(): void {
    
    this.getUniversites();
  }

  ngAfterViewInit(): void {
    this.dataTablesInstance = $('#universitesTable').DataTable({});
  }

  getUniversites(){
    this.universiteService.getAllUniversities().subscribe(
      reponse => this.universites = reponse 
    )
  }

  deleteUniversite(idUniversite : number){

    if (confirm('Are you sure you want to delete this université ?')) {
      this.universiteService.deleteUniversite(idUniversite).subscribe(
        () => {
          alert("université deleted");
          console.log('université deleted successfully');
          // Recharger les données DataTables
          this.dataTablesInstance.ajax.reload();
          this.getUniversites();
        },
        (error) => {
          console.error('Error deleting université', error);
          // Handle error as needed
        }
      );
    }

  }

  navigateTo(id : number){
    this.router.navigate(['ajouterUniversite/'+id]);
  }

}
