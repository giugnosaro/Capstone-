import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { 
    this.setInitialStyles();
  }


  private setInitialStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'opacity 0.5s ease-out');
  }


  @HostListener('window:scroll', [])

  onWindowScroll() {
    const elementPosition = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    }
  }

}
