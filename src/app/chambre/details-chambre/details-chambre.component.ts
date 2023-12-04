import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chambre } from 'src/app/models/chambre';
import { ChambreService } from 'src/app/services/chambre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-chambre',
  templateUrl: './details-chambre.component.html',
  styleUrls: ['./details-chambre.component.css']
})
export class DetailsChambreComponent {
  chambre : Chambre[] = [] ;


  constructor(
    private chambreService : ChambreService ,
    private router : Router,
  ){}

  ngOnInit(): void {
    this.getAllChambre();
  }

  getAllChambre(){
    this.chambreService.getChambres().subscribe(
      reponse => this.chambre = reponse
    )
  }

  parentDeleteChambre(chambreId: number) {

    if (confirm('Are you sure you want to delete this chambre ?')) {
      this.chambreService.deleteChambre(chambreId).subscribe(
        () => {
          console.log('chambre deleted successfully');
          // Recharger les données DataTables
          Swal.fire({
            title: 'Succès!',
            text: 'chambre a été supprimé avec succés',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Optionally, reload the chambre list or navigate to another route
            this.getAllChambre();
            this.router.navigate(['/details-chambre']);
          });
        },
        (error) => {
          console.error('Error deleting chambre', error);
          // Handle error as needed
        }
      );
    }

  }

}
