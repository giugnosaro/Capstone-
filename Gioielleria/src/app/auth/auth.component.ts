import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../service/authservice/auth.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {
  nome = '';
  email = '';
  password = '';
  isAuthenticated = false;

  // Riferimenti agli elementi del DOM
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  

  constructor(private authService: AuthService) {}

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
      .register({ nome: this.nome, email: this.email, password: this.password })
      .pipe(
        tap((response) => {
          console.log('Registrazione avvenuta con successo!', response);
          this.resetForm();
          this.isAuthenticated = true;
        }),
        catchError((error) => {
          console.error('Errore durante la registrazione', error);
          // Mostra i dettagli completi dell'errore per capire meglio cosa sta succedendo
          if (error.error && error.error.errors) {
            console.log('Dettagli degli errori di validazione:', error.error.errors);
            // Puoi aggiungere log specifici per ogni errore di validazione
            Object.entries(error.error.errors).forEach(([key, value]) => {
              console.log(`Errore sul campo ${key}: ${value}`);
            });
          }
          return of(null); // Ritorna un Observable vuoto per continuare il flusso
        })
      )
      .subscribe();
  }
  login() {
    // Logica per il login dell'utente
    if (!this.email || !this.password) {
      console.error('Compila tutti i campi per il login');
      return;
    }

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login avvenuto con successo!', response);
          this.isAuthenticated = true;
        },
        (error) => {
          console.error('Errore durante il login', error);
        }
      );
  }

  logout() {
    // Logica per il logout
    this.authService.logout();
    this.isAuthenticated = false;
    console.log('Logout effettuato');
  }

  resetForm() {
    // Resetta i campi del form
    this.nome = '';
    this.email = '';
    this.password = '';
  }
}