import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = null;

  constructor(private userService: UserService , private router: Router) {}
  

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

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

