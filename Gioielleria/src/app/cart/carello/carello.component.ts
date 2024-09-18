import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import * as bootstrap from 'bootstrap'; // Import bootstrap

@Component({
  selector: 'app-carello',
  templateUrl: './carello.component.html',
  styleUrls: ['./carello.component.css']
})
export class CarelloComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService , private router: Router) {
    this.cartItems = this.cartService.getCartItems();  // Otteniamo gli articoli dal carrello
    this.calculateTotal();  // Calcoliamo il totale
    console.log(this.cartItems);  // Verifica se imageUrl è presente in ogni prodotto

  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

    // Seleziona il modale tramite il suo ID e aprilo automaticamente
    const cartModalElement = document.getElementById('cartModal');
    if (cartModalElement) {
      const cartModal = new bootstrap.Modal(cartModalElement);
      cartModal.show();  // Mostra il modale automaticamente
    } else {
      console.error('Elemento cartModal non trovato.');
    }
  }

 // Calcolare il totale del carrello
 calculateTotal() {
  this.totalAmount = this.cartItems.reduce((sum, item) => {
    const prezzo = parseFloat(item.prezzo);  // Converti il prezzo in un numero
    const quantity = item.quantity ? item.quantity : 1;  // Assicurati che la quantità sia definita
    if (!isNaN(prezzo)) {
      return sum + (prezzo * quantity);
    }
    return sum;  // Se prezzo non è un numero valido, non aggiungerlo al totale
  }, 0);
}


  // Rimuovere un articolo dal carrello
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();  // Aggiorniamo il carrello
    this.calculateTotal();  // Ricalcoliamo il totale
  }

  // Funzione per gestire il checkout (potrebbe redirigere a una pagina di pagamento)
  checkout() {
    alert('Vai alla pagina di pagamento!');
    this.router.navigate(['/checkout']);  // Reindirizza alla pagina di pagamento
    // In futuro, puoi inviare i dati del carrello al backend per processare l'ordine
  }

}
