import { Component } from '@angular/core';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import Splide from '@splidejs/splide';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  ngOnInit(): void {
    new Splide('.splide', {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      arrows: false,
      pagination: false,
      perPage: 8,
      gap: '5px',
      autoScroll: {
        speed: 0.2,
        pauseOnHover: false,
      },
      extensions: { AutoScroll },
      breakpoints: {
        1920: {
          perPage: 4,
        },
        1558: {
          perPage: 3,
        },

        1195: {
          perPage: 2,
        },

        992: {
          perPage: 2,
        },
        768: {
          perPage: 4,
          height: '130px',
        },
        576: {
          perPage: 2,
          height: '120px',
        },
        530: {
          perPage: 2,
          height: '100px',
        },
      },
    }).mount({ AutoScroll });
}

}
