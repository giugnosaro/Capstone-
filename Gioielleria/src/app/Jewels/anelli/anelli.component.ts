import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-anelli',
  templateUrl: './anelli.component.html',
  styleUrls: ['./anelli.component.css']
})
export class AnelliComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {

    this.caricaProdottiAnelli();
  }


  caricaProdottiAnelli(): void {
    const idCategoriaAnelli = 2; // Usa l'ID della categoria "Anelli"
    this.prodottiService.getProdottiByCategoria(idCategoriaAnelli).subscribe((data) => {
      this.prodotti = data;
    });
  }
}
