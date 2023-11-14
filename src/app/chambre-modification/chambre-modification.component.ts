import { Component, Input, OnInit } from '@angular/core';
import { ChambreService } from '../services/chambre.service';
import { Chambre } from '../models/chambre';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-chambre-modification',
  templateUrl: './chambre-modification.component.html',
  styleUrls: ['./chambre-modification.component.css']
})
export class ChambreModificationComponent implements OnInit {

  chambre!: Chambre;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chambreService: ChambreService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // '+' is used to convert the id to a number
      this.loadChambre(id);

    });
  }

  loadChambre(id: number): void {
    this.chambreService.getChambreById(id).subscribe(
      (chambre: Chambre) => {
        this.chambre = chambre;
      },
      (error) => {
        console.error('Error loading chambre', error);
      }
    );
  }

  updateChambre(): void {
    this.chambreService.updateChambre(this.chambre.idChambre, this.chambre).subscribe(
      (updatedChambre: Chambre) => {
        console.log('Chambre updated successfully', updatedChambre);
        // Optionally, navigate back to the chambre list or any other route
        this.router.navigate(['/chambre']);
      },
      (error) => {
        console.error('Error updating chambre', error);
        // Handle error as needed
      }
    );
  }
}