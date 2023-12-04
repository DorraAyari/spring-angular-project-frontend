import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../Service/bloc.service';
import { Bloc } from 'src/app/models/bloc';

@Component({
  selector: 'app-edit-bloc',
  templateUrl: './edit-bloc.component.html',
  styleUrls: ['./edit-bloc.component.css']
})
export class EditBlocComponent implements OnInit {
  bloc!: Bloc;

  constructor( private service: BlocService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadBloc(id);

    });
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
  }  }
