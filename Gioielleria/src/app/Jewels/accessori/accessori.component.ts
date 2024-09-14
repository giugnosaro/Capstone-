import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-accessori',
  templateUrl: './accessori.component.html',
  styleUrls: ['./accessori.component.css']
})
export class AccessoriComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
    this.caricaProdottiAccessori();
  }

  caricaProdottiAccessori(): void {
    const idCategoriaAccessori = 6; // Usa l'ID della categoria "Accessori"
    this.prodottiService.getProdottiByCategoria(idCategoriaAccessori).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
