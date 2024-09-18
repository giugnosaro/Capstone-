import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartItems: any[] = [];
  totalAmount: number = 0;
  productDetails: { [key: number]: any } = {};

  email: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  company: string = '';
  taxCode: string = '';
  

  // Aggiungi il checkoutService al costruttore
  constructor(private checkoutService: CheckoutService , private cartService: CartService , private http: HttpClient) {
    
    this.cartItems = this.cartService.getCartItems();  // Otteniamo gli articoli dal carrello
    this.calculateTotal();  // Calcoliamo il totale

  }

    calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.prezzo * item.quantity, 0);
  }

  ngOnInit() {
    // Recupera i prodotti dal carrello
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);  // Verifica che il carrello abbia i prodotti con le immagini
  }
  

  // Metodo per recuperare i dettagli del prodotto
  getProductDetails(id: number) {
    this.http.get(`/api/prodotti/${id}`).subscribe(
      (product: any) => {
        console.log('Prodotto recuperato:', product);  // Verifica che l'immagine sia presente in formato base64
        this.productDetails[id] = product;
      },
      (error) => {
        console.error(`Errore nel recupero del prodotto con id ${id}:`, error);
        alert(`Errore nel recupero del prodotto con id ${id}. Riprova più tardi.`);
      }
    );
  }
  
  
  // Metodo per inviare il checkout
  submitCheckout() {
    const checkoutData = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      company: this.company,
      taxCode: this.taxCode
    };

    this.checkoutService.submitOrder(checkoutData).subscribe({
      next: (response: any) => {
        console.log('Ordine inviato con successo:', response);
      },
      error: (error: any) => {
        console.error('Errore durante l\'invio dell\'ordine:', error);
      }
    });
  }
}
