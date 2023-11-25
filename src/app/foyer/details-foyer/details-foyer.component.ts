import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-foyer',
  templateUrl: './details-foyer.component.html',
  styleUrls: ['./details-foyer.component.css']
})
export class DetailsFoyerComponent {

  foyer : Foyer[] = [] ;
 

  constructor(
    private foyerService : FoyerService ,
    private router : Router, 
  ){}

  ngOnInit(): void {
    this.getAllFoyer();
  }

  getAllFoyer(){
    this.foyerService.getFoyes().subscribe(
      reponse => this.foyer = reponse 
    )
  }

  parentDeleteFoyer(idFoyer : number){

    if (confirm('Are you sure you want to delete this foyer ?')) {
      this.foyerService.deleteFoyer(idFoyer).subscribe(
        () => {
          console.log('foyer deleted successfully');
          // Recharger les données DataTables
          Swal.fire({
            title: 'Succès!',
            text: 'foyer a été supprimé avec succés',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally, reload the chambre list or navigate to another route
            this.getAllFoyer();
            this.router.navigate(['/details-foyer']);
          });
        },
        (error) => {
          console.error('Error deleting foyer', error);
          // Handle error as needed
        }
      );
    }

  }

}
