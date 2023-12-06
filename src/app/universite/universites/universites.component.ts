import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import Swal from 'sweetalert2';
import { ListeUniversitesComponent } from '../liste-universites/liste-universites.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-universites',
  templateUrl: './universites.component.html',
  styleUrls: ['./universites.component.css']
})
export class UniversitesComponent implements OnInit{

  universites : Universite[] = [] ;
  
 // @ViewChild(ListeUniversitesComponent) private lu !: ListeUniversitesComponent ;

 
  @ViewChild(PopupComponent) popup!: PopupComponent;
 

  constructor(
    private universiteService : UniversiteService ,
    private router : Router, 
  ){}

  ngOnInit(): void {
    this.getUniversites();
  }

  // ngAfterViewInit(): void {
    
  //   this.lu.componentReady.subscribe(
  //     () => {
  //     this.parentDeleteUnive(this.id);
    
  //   })
  // }
  
  getUniversites(){
    this.universiteService.getAllUniversities().subscribe(
      reponse => this.universites = reponse 
    )
  }

  parentDeleteUnive(idUniversite : number){

      if (confirm('Are you sure you want to delete this université ?')) {
        this.universiteService.deleteUniversite(idUniversite).subscribe(
          () => {
            console.log('université deleted successfully');
           
          //  Swal.fire({
          //     title: 'Succès!',
          //     text: 'Université a été supprimé avec succés',
          //     icon: 'success',
          //    confirmButtonText: 'OK'
          //   }).then(() => {
             
          //    this.getUniversites();
          //    this.router.navigate(['/universites']);
          //   });
        this.popup.showPopup();
        },
         (error) => {
           console.error('Error deleting université', error);
            // Handle error as needed
         }
        );
      }

   // this.lu.deleteUniversite(idUniversite);
  //  if (this.lu) {
  //   this.lu.deleteUniversite(idUniversite);
  // } else {
  //   console.error('Le composant ListeUniversitesComponent n\'est pas initialisé.');
  // }

 
    //this.id = idUniversite ; 
    //console.log("***",this.id);
    //this.lu.componentReady.subscribe(
     // () => {
   // this.lu.deleteUniversite(this.id);
    
 // })
 }

 goToList(){
  this.router.navigate(['/showUniversites'])

}


}
