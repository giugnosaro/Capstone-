import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  prodotti: any[] = [];
  
  constructor(private prodottiService: ProdottiService , private cartService: CartService) { }

  ngOnInit(): void {

    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottiService.getProdotti().subscribe({
      next: (data) => {
        console.log('Dati ricevuti dal server:', data); // Log dell'oggetto completo ricevuto
        this.prodotti = data;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei prodotti:', error);
      }
    });
  }

  addToCart(prodotto: any) {
    this.cartService.addToCart(prodotto);
    alert(`${prodotto.nome} è stato aggiunto al carrello!`);
  }
  

}
