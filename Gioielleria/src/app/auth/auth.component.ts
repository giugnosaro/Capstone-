import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('signUpButton', { static: true }) signUpButton!: ElementRef;
  @ViewChild('signInButton', { static: true }) signInButton!: ElementRef;
  @ViewChild('container', { static: true }) container!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('right-panel-active');
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('right-panel-active');
    });
  }
}
