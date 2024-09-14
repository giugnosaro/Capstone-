import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-orologi',
  templateUrl: './orologi.component.html',
  styleUrls: ['./orologi.component.css']
})
export class OrologiComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
    this.caricaProdottiOrologi();
  }

  caricaProdottiOrologi(): void {
    const idCategoriaOrologi = 7; // Usa l'ID della categoria "Orologi"
    this.prodottiService.getProdottiByCategoria(idCategoriaOrologi).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
