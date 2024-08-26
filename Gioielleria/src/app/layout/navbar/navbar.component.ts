import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  
}

document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("background-video") as HTMLVideoElement;

  if (videoElement) {
    videoElement.play().catch(error => {
      console.error('Autoplay non riuscito:', error);
      // Eventualmente, puoi gestire l'errore, ad esempio mostrando un pulsante per far partire il video manualmente
    });
  } else {
    console.error('Elemento video non trovato.');
  }
});

