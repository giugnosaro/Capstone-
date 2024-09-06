import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../service/authservice/auth.component';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {
  nome: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User';
  isAuthenticated: boolean = false;
  toastMessage: string | null = null;
  isProfileModalOpen: boolean = false;

  // Riferimenti agli elementi del DOM
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  

  

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    // Aggiungi gli event listener per i pulsanti
    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('right-panel-active');
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('right-panel-active');
    });
  }

  register() {
    if (!this.nome || !this.email || !this.password) {
      console.error('Compila tutti i campi per la registrazione');
      return;
    }

    this.authService
      .register({ nome: this.nome, email: this.email, password: this.password, role: this.role })
      .pipe(
        tap((response) => {
          console.log('Registrazione avvenuta con successo!', response);
          this.isAuthenticated = true;
          this.showSuccessToast('Registrazione effettuata con successo!');
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          console.error('Errore durante la registrazione', error);
          this.showErrorToast('Errore durante la registrazione');
          return of(null);
        })
      )
      .subscribe(); // Corretto: Assicurati di chiamare .subscribe()
  }
  
  

  login() {
    if (!this.email || !this.password) {
      console.error("Compila tutti i campi per l'accesso");
      return;
    }

    this.authService
      .login({ email: this.email, password: this.password })
      .pipe(
        tap((response) => {
          console.log('Accesso effettuato con successo!', response);

          if (response && response.user) {
            this.isAuthenticated = true;
            this.nome = response.user.nome;
            this.email = response.user.email;
            this.role = response.user.role;
            this.userService.setUser(response.user); 
            this.showSuccessToast('Accesso effettuato con successo!');
            this.router.navigate(['/home']);
          } else {
            this.showErrorToast("Errore: Dati dell'utente non trovati.");
          }
        }),
        catchError((error) => {
          console.error("Errore durante l'accesso", error);
          this.showErrorToast('Errore durante l\'accesso');
          return of(null);
        })
      )
      .subscribe();
  }
  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  // Funzione per chiudere il modale del profilo
  closeProfileModal() {
    this.isProfileModalOpen = false;
  }
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.userService.clearUser();
    this.showInfoToast('Logout effettuato con successo!', 'Arrivederci!');
  }
  showSuccessToast(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  showErrorToast(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Errore',
      text: message,
      showConfirmButton: true
    });
  }

  showInfoToast(message: string, title: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      showConfirmButton: true
    });
  }
  
  resetForm() {
    // Resetta i campi del form
    this.nome = '';
    this.email = '';
    this.password = '';
    this.role = 'User';
  }
}
