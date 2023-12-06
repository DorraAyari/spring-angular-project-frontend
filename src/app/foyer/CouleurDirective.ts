// couleur.directive.ts
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCouleur]'
})
export class CouleurDirective {
  @Input() couleur: string = 'lightblue';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const tableCells = this.el.nativeElement.querySelectorAll('td');

    tableCells.forEach((cell: any) => {
      this.renderer.setStyle(cell, 'background-color', this.couleur);
    });
  }
}
