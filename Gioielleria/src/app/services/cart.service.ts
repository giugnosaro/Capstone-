import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 cartItems: any[] = [];


  constructor() {

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
   }

   addToCart(product: any) {
    // Verifica se il prodotto è già nel carrello
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: product.id,
        nome: product.nome,
        descrizione: product.descrizione,
        prezzo: parseFloat(product.prezzo),  // Assicurati che il prezzo sia un numero
        immagine: product.immagine,
        quantity: 1
      });
    }
    this.saveCart();  // Salva il carrello nel localStorage
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.saveCart();  // Aggiorna il carrello nel localStorage
  }
  
  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

}
