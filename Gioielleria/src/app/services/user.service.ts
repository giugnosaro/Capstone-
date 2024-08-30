// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any;

  constructor() {}

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return this.user ? this.user : JSON.parse(localStorage.getItem('user') || '{}');
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
