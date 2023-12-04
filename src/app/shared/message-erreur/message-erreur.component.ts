import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-erreur',
  templateUrl: './message-erreur.component.html',
  styleUrls: ['./message-erreur.component.css']
})
export class MessageErreurComponent {

  @Input() erreur : any | null = null ;
}
