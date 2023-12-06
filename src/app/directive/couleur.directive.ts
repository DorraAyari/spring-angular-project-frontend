import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCouleur]'
})
export class CouleurDirective {

  constructor(
    private elementRef : ElementRef,
  ) { }

  
  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor('azure');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor("")
  }
  changeColor(color: any) {

    this.elementRef.nativeElement.style.backgroundColor = color;
  }


}
