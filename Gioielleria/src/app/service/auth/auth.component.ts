import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private apiUrl = 'http://localhost:4200'; // URL dell’endpoint della tua API

  constructor(private http: HttpClient) { }

  getValues(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
