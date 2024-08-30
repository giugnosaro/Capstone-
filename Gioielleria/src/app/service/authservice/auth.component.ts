
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7296'; // Assicurati che questo sia l'URL corretto del tuo backend

  constructor(private http: HttpClient) {}

  // Metodo per registrare un nuovo utente
  register(userData: { nome: string; email: string; password: string;  role: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Metodo per effettuare il login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Salva il token nel localStorage
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role); // Salva il ruolo
        }
      })
    );
  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Metodo per ottenere il token JWT
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Metodo per effettuare il logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

