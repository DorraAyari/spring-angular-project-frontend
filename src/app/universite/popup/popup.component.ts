import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Input() title: string = 'Succès!';
  @Input() text: string = '';
  @Input() icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success';
  @Input() confirmButtonText: string = 'OK';

  @Output() confirmed = new EventEmitter<void>();

  showPopup(): void {
    Swal.fire({
      title: this.title,
      text: this.text,
      icon: this.icon,
      confirmButtonText: this.confirmButtonText
    }).then(() => {
      this.confirmed.emit();
    });
  }

}
