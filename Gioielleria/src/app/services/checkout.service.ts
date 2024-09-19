import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  

    private checkoutUrl = 'https://localhost:7296/api/Order';

  constructor(private Http: HttpClient) { }

  createOrder(orderData: FormData) {
    return this.Http.post('https://localhost:7296/api/Order', orderData);
  }
  
  
}
