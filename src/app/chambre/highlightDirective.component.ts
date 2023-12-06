// highlight.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() set appHighlight(condition: boolean) {
    // Set background color to light green if the condition is true
    const color = condition ? 'lightgreen' : null;
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
