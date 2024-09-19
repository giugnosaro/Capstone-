import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';


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
  shippingAddress: string = '';
  paymentMethod: string = 'Carta di credito'; 
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  company: string = '';
  taxCode: string = '';
  

  // Aggiungi il checkoutService al costruttore
  constructor(private checkoutService: CheckoutService , private cartService: CartService , private http: HttpClient, private router: Router) {
    
    this.cartItems = this.cartService.getCartItems();  // Otteniamo gli articoli dal carrello
    this.calculateTotal();  // Calcoliamo il totale

  }

    calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.prezzo * item.quantity, 0);
  }

  submitOrder() {
    const formData = new FormData();
  
    // Aggiungi i campi dell'ordine
    formData.append('CustomerEmail', this.email);
    formData.append('ShippingAddress', this.address);
    formData.append('TotalAmount', this.totalAmount.toString());
    formData.append('PaymentMethod', this.paymentMethod);
  
    // Aggiungi gli articoli dell'ordine
    this.cartItems.forEach((item, index) => {
      formData.append(`OrderItems[${index}].ProductId`, item.id.toString());
      formData.append(`OrderItems[${index}].Quantity`, item.quantity.toString());
      formData.append(`OrderItems[${index}].Price`, item.prezzo.toString());
  
      // Rimuovi la riga relativa all'OrderId
      // Se l'OrderId viene gestito dal backend, non serve inviarlo qui
    });
  
    // Invia il formData
    this.checkoutService.createOrder(formData).subscribe(
      (response) => {
        console.log('Ordine creato con successo:', response);
      },
      (error) => {
        console.error('Errore durante la creazione dell\'ordine:', error);
      }
    );
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
 // submitCheckout() {
 //   const checkoutData = {
 //     email: this.email,
 //   firstName: this.firstName,
 //     lastName: this.lastName,
  //    address: this.address,
  //    company: this.company,
  //    taxCode: this.taxCode
 //   };

   // this.checkoutService.submitOrder(checkoutData).subscribe({
   //   next: (response: any) => {
   //     console.log('Ordine inviato con successo:', response);
   //   },
   //   error: (error: any) => {
   //     console.error('Errore durante l\'invio dell\'ordine:', error);
   //   }
  //  });
 // }
}
