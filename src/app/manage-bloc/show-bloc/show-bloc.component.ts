import { Component, OnInit } from '@angular/core';
import { BlocService } from '../Service/bloc.service';
import { Bloc } from 'src/app/models/bloc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.css']
})
export class ShowBlocComponent implements OnInit{
  constructor(private service:BlocService, private router: Router){}
  blocs!:Bloc[];
  ngOnInit(): void {
    this.service.findAll().subscribe(
      (d=>{console.log(d)
      this.blocs=d;}
    ))
  }
  
  deleteBloc(id: number) {
    this.service.deleteBloc(id).subscribe(
      () => {
        alert('Bloc deleted successfully');
        // You might want to refresh the list of blocs after deletion
        this.ngOnInit();
      },
      error => {
        // Handle error scenarios
        console.error('Deletion failed', error);
        alert('Bloc deletion failed');
      }
    );}
    updateBloc(id: number) {
      this.router.navigate([`/bloc/${id}`]);
    }

    addBloc(){
      this.router.navigate(['/add']);
    }
}
