import { ChangeDetectorRef, Component } from '@angular/core';
import { Bloc } from 'src/app/models/bloc';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../../services/bloc.service';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-bloc',
  templateUrl: './add-bloc.component.html',
  styleUrls: ['./add-bloc.component.css']
})
export class AddBlocComponent {
  foyer:Foyer[]=[];
  selectedFoyerNom: string = ''; // Declare selectedFoyerNom here
  selectedFoyer: Foyer;
  newBloc: Bloc = { idBloc: 0, nomBloc: "", capaciteBloc: 0 , foyer:{ idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite:null},foyer_id_foyer:0};
  
  constructor(private service: BlocService, private route: ActivatedRoute, private router: Router, private foyerService: FoyerService,
    private cdr: ChangeDetectorRef) {
    this.selectedFoyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: null };
    this.newBloc.foyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: null }; // Assurez-vous que newBloc.foyer est initialisé
  }
  

 
      ngOnInit() {
        this.loadBlocs();
        this.loadFoeyer(); // Ajoutez cette ligne pour charger les foyers
        this.selectedFoyerNom = this.foyer.length > 0 ? String(this.foyer[0].nomFoyer) : '';
      }
      

      updateFoyerId(event: any) {
        const selectedFoyerValue: string = event.target.value.split(': ')[1];
        console.log('Selected Foyer Value:', selectedFoyerValue);
        console.log('Foyers:', this.foyer);
    
        const selectedFoyer = this.foyer.find(b => b.nomFoyer === selectedFoyerValue);
    
        if (selectedFoyer) {
          this.selectedFoyer = selectedFoyer;
          this.selectedFoyerNom = selectedFoyerValue; // Set selectedBlocNom here
        }
      }


      loadFoeyer(): void {
        this.foyerService.getFoyes().subscribe(
          (foyers: Foyer[]) => {
            this.foyer = foyers;
            console.log('Foyer:', this.foyer);
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error fetching blocs', error);
          }
        );
      }

  addBloc(): void {
    if (!this.newBloc.nomBloc || !this.newBloc.capaciteBloc) {
      alert('Veuillez remplir le formulaire avant de soumettre.');
      return;
    }

    // Ensure that newBloc.bloc is defined before accessing its properties
    if (!this.newBloc.foyer) {
      this.newBloc.foyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0,universite:null };
    }

    // Use selectedFoyer from updateBlocId directly
    const selectedFoyer = this.foyer.find(b => b.nomFoyer === this.selectedFoyerNom);

    if (selectedFoyer) {
      this.selectedFoyer = selectedFoyer;

      // Rest of your code remains the same
      this.newBloc.nomBloc = this.newBloc.nomBloc;
      this.newBloc.foyer = selectedFoyer;
    }
      const blocToAdd: Bloc = {
        idBloc: this.newBloc.idBloc,
        nomBloc: this.newBloc.nomBloc,
        capaciteBloc: this.newBloc.capaciteBloc,
        foyer: this.newBloc.foyer,  // Assign the modified bloc object here
        foyer_id_foyer: this.selectedFoyer.idFoyer || 0
      };

      console.log("ew", this.selectedFoyer.idFoyer);
      console.log("ew3", this.selectedFoyer);

      this.service.addBloc(blocToAdd).subscribe(
        (blocToAdd: Bloc) => {
          console.log('Bloc added successfully', blocToAdd);
          Swal.fire({
            title: 'Succès!',
            text: 'Bloc ajoutée avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.loadBlocs();
            this.router.navigate(['/bloc']);
            this.newBloc = {
              idBloc: 0,
              nomBloc: '',
              capaciteBloc: 0,
              foyer: { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0,universite:null }, // Initialize bloc
              foyer_id_foyer: 0
            };
          });
        },
        (error) => {
          console.error('Error adding bloc', error);
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'ajout de la bloc.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }

  loadBlocs(): void {
    
  }

}
