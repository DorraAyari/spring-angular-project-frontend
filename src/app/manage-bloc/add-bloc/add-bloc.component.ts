import { Component } from '@angular/core';
import { Bloc } from 'src/app/models/bloc';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BlocService } from '../Service/bloc.service';
@Component({
  selector: 'app-add-bloc',
  templateUrl: './add-bloc.component.html',
  styleUrls: ['./add-bloc.component.css']
})
export class AddBlocComponent {
  newBloc: Bloc = { idBloc: 0, nomBloc: "", capaciteBloc: 0 };
  
  constructor( private service: BlocService, private route: ActivatedRoute, private router: Router) {}

  addBloc(): void {
   
    this.service.addBloc(this.newBloc).subscribe(
      (addedBloc: Bloc) => {
        console.log('Bloc added successfully', addedBloc);
        // Optionally, reload the Bloc list or navigate to another route
        this.loadBlocs();
        this.router.navigate(['/bloc']);

        // Reset the newBloc object for a new entry
        this.newBloc = { idBloc: 0, nomBloc: "", capaciteBloc: 0};
      },
      (error) => {
        console.error('Error adding Bloc', error);
        // Handle error as needed
      }
    );
  }
  loadBlocs(): void {
    

  }

}
