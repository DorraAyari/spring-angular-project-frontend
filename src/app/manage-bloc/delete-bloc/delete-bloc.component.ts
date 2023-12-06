import { Component } from '@angular/core';
import { BlocService } from '../../services/bloc.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-bloc',
  templateUrl: './delete-bloc.component.html',
  styleUrls: ['./delete-bloc.component.css']
})
export class DeleteBlocComponent  {
constructor(private bloc:BlocService,private ac:ActivatedRoute,
  private router:Router)  {}
    
    ngOnInit(){

      this.bloc.deleteBloc(this.ac.snapshot.params['id']).subscribe(
        ()=>{
          alert('next')
            //this.router.navigate(['users'])
          },
          (err)=>{
            let status=err.status;
            switch (status){
              case 0:alert('server ') ;break;
              case 401:alert('unauthoriz ') ;break;
              case 404:alert('unauthoriz ') ;break;
            }
          },
          ()=>{
            alert('add bloc')
          }
        );
    }
  
}

