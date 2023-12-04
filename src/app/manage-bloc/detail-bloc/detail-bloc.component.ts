import { Component, OnInit } from '@angular/core';
import { Bloc } from 'src/app/models/bloc';
import { BlocService } from '../Service/bloc.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-bloc',
  templateUrl: './detail-bloc.component.html',
  styleUrls: ['./detail-bloc.component.css']
})
export class DetailBlocComponent implements OnInit{
  id:any;
  bloc=new Bloc;
  constructor( private  activatedroute: ActivatedRoute,private service: BlocService){}
  
   ngOnInit(): void {
     this.id=  this.activatedroute.snapshot.params['id'];
     this.service.findById(this.id).subscribe(
       (data)=>{
         this.bloc=data;
         console.log(data);
       }
     )
 
   }
 
 }
 
