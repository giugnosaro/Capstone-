import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  isAuthenticated: boolean = false;
  isProfileModalOpen: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAuthenticated = !!this.user; // Verifica se l'utente è autenticato
  }

  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

  logout() {
    this.userService.clearUser();
    this.isAuthenticated = false;
    this.closeProfileModal();
    this.router.navigate(['/login']);
  }
}

// Gestione del video di sfondo
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
