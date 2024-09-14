import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-collane',
  templateUrl: './collane.component.html',
  styleUrls: ['./collane.component.css']
})
export class CollaneComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {

    this.caricaProdottiCollane();
  }

  caricaProdottiCollane(): void {
    const idCategoriaCollane = 1; // Usa l'ID della categoria "Collane"
    this.prodottiService.getProdottiByCategoria(idCategoriaCollane).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
