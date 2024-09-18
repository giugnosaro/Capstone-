import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/service/authservice/authservice.component';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  isAuthenticated: boolean = false;
  isProfileModalOpen: boolean = false;
  isAdmin: boolean = false;
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private userService: UserService, private router: Router , private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAuthenticated = !!this.user; // Verifica se l'utente è autenticato
    this.isAdmin = this.authService.getUserRole() === 'Admin';
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

    const userRole = this.authService.getUserRole();
    console.log('User Role retrieved from localStorage:', userRole);
    this.isAdmin = userRole === 'Admin';
    console.log('User role:', this.user.role);

  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.prezzo * item.quantity, 0);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  openCartModal() {
    const modalElement = document.getElementById('cartModal');
  
    if (modalElement) {
      const cartModal = new bootstrap.Modal(modalElement, {
        backdrop: false,  // Disabilita il backdrop scuro
        keyboard: true    // Permette di chiudere il modale con la tastiera (ad esempio, premendo Esc)
      });
      cartModal.show();
    } else {
      console.error('Elemento modale non trovato');
    }
  }

  openProfileModal() {
    this.isProfileModalOpen = true;
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);  // Reindirizza alla pagina di checkout
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.closeProfileModal();
    this.router.navigate(['/login']);
  }
}

// Gestione del video di sfondo
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
