import { Directive, ElementRef, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appGsapAnimation]'
})
export class GsapAnimationDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    gsap.from(this.el.nativeElement, {
      opacity: 0,
      y: 50, // Muove dal basso verso l'alto
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: this.el.nativeElement,
        start: "top 60%",
        toggleActions: "play none none none"
      }
    });
    
  }

}
