import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authservice/authservice.component';
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
  isAdmin: boolean = false;

  constructor(private userService: UserService, private router: Router , private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAuthenticated = !!this.user; // Verifica se l'utente è autenticato
    this.isAdmin = this.authService.getUserRole() === 'Admin';

    const userRole = this.authService.getUserRole();
    console.log('User Role retrieved from localStorage:', userRole);
    this.isAdmin = userRole === 'Admin';
    console.log('User role:', this.user.role);

  }

  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
    this.isAuthenticated = false;
    this.isAdmin = false;
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
