import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {
  private baseUrl = 'https://localhost:7296/api/Prodotti';
  private categorieUrl = 'https://localhost:7296/api/Prodotti/categorie';

  constructor(private http: HttpClient) {}

  getCategorie(): Observable<any[]> {
    return this.http.get<any[]>(this.categorieUrl).pipe(
      tap(data => console.log('Categorie ricevute:', data)),
      catchError((error) => {
        console.error('Errore durante il recupero delle categorie', error);
        return throwError(error);
      })
    );
  }

  getProdotti(): Observable<any[]> { // Metodo per ottenere i prodotti
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => console.log('Prodotti ricevuti:', data)),
      catchError((error) => {
        console.error('Errore durante il recupero dei prodotti', error);
        return throwError(error);
      })
    );
  }

  addProdotto(prodotto: any, immagine: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nome', prodotto.nome);
    formData.append('descrizione', prodotto.descrizione);
    formData.append('prezzo', prodotto.prezzo.toString());
    formData.append('idCategoria', prodotto.idCategoria.toString());
    formData.append('immagine', prodotto.immagine); // Immagine come stringa base64
  
    return this.http.post(this.baseUrl, formData);
  }
  
}
