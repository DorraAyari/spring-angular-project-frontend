
import { Component, Input } from '@angular/core';

// Dans le composant MessageErreurComponent
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-message-erreur',
  templateUrl: './message-erreur.component.html',
  styleUrls: ['./message-erreur.component.css']
})
export class MessageErreurComponent {


  @Input() erreur : any | null = null ;

  @Input() erreur: any | null = null;
  @Output() onErreurClique: EventEmitter<void> = new EventEmitter<void>();

  notifierCliqueErreur() {
    this.onErreurClique.emit();
  }

}
