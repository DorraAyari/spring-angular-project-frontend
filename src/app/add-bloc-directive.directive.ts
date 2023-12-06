import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddBlocDirective]'
})
export class AddBlocDirectiveDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  @HostListener('change', ['$event'])
  onInput(event: Event): void {
    const inputs = this.el.nativeElement.querySelectorAll('input[ngModel], select[ngModel]');
    let isValid = true;

    inputs.forEach((input: any) => {
      if (input.required && (!input.value || input.value.trim() === '')) {
        isValid = false;
      }
      // Vérifiez également si le champ de sélection a une valeur valide
      if (input.nodeName === 'SELECT' && !input.value) {
        isValid = false;
      }
    });

    const button = this.el.nativeElement.querySelector('button[type="submit"]');
    if (button) {
      this.renderer.setProperty(button, 'disabled', !isValid);
    }
  }
}
