import { ChangeDetectorRef, Component, OnInit ,EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from 'src/app/models/bloc';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';

@Component({
  selector: 'app-edit-bloc',
  templateUrl: './edit-bloc.component.html',
  styleUrls: ['./edit-bloc.component.css']
})
export class EditBlocComponent implements OnInit {
  bloc!: Bloc;
  foyer:Foyer[]=[];
  selectedFoyerNom: string = ''; // Declare selectedFoyerNom here
  selectedFoyer: Foyer;
  newBloc: Bloc = { idBloc: 0, nomBloc: "", capaciteBloc: 0 , foyer:{ idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: {
    idUniversite:0,
    nomUniversite:'',
    adresse:''  }},foyer_id_foyer:0};
  @Output() erreurClique: EventEmitter<void> = new EventEmitter<void>();

  constructor( private service: BlocService, private route: ActivatedRoute, private router: Router,private foyerService: FoyerService,
    private cdr: ChangeDetectorRef) {
    this.selectedFoyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: {
      idUniversite:0,
      nomUniversite:'',
      adresse:''  }};
    this.newBloc.foyer = { idFoyer: 0, nomFoyer: '', capaciteFoyer: 0, universite: {
      idUniversite:0,
      nomUniversite:'',
      adresse:''  } }; // Assurez-vous que newBloc.foyer est initialisé

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadBloc(id);
      this.loadFoeyer();
      this.selectedFoyerNom = this.foyer.length > 0 ? String(this.foyer[0].nomFoyer) : '';

    });
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


    
  loadBloc(id: number): void {
    this.service.findById(id).subscribe(
      (Bloc: Bloc) => {
        this.bloc = Bloc;
      },
      (error) => {
        console.error('Error loading Bloc', error);
      }
    );
  }

  updateBloc(): void {
    this.service.updateBloc(this.bloc,this.bloc.idBloc ).subscribe(
      (updatedBloc: Bloc) => {
        console.log('Bloc updated successfully', updatedBloc);

        // Optionally, navigate back to the Bloc list or any other route
        this.router.navigate(['/bloc']);
      },
      (error) => {
        console.error('Error updating Bloc', error);
        // Handle error as needed
      }
    );
  }  
  gestionCliqueErreur() {
    console.log('Clic sur l\'erreur détecté dans le composant parent.');
    // Ajoutez le code de gestion supplémentaire ici, si nécessaire.
  }
}
