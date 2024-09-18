import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

    private checkoutUrl = 'https://localhost:7296/api/Order/checkout';

  constructor(private Http: HttpClient) { }

    submitOrder (orderData: any) {
        return this.Http.post(this.checkoutUrl, orderData);
    }
}
