import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor (
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    /*
    this.auth.getBlocs().subscribe(
      {
        next: (res) => {
          console.log(res);
        }
      }
    );
    */


  }



}
