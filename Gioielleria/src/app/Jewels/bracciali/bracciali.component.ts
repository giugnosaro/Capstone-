import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-bracciali',
  templateUrl: './bracciali.component.html',
  styleUrls: ['./bracciali.component.css']
})
export class BraccialiComponent implements OnInit {
  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
    this.caricaProdottiBracciali();
  }


  caricaProdottiBracciali(): void {
    const idCategoriaBracciali = 3; // Usa l'ID della categoria "Bracciali"
    this.prodottiService.getProdottiByCategoria(idCategoriaBracciali).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
