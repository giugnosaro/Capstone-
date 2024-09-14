import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-ciondoli',
  templateUrl: './ciondoli.component.html',
  styleUrls: ['./ciondoli.component.css']
})
export class CiondoliComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService ) { }

  ngOnInit(): void {
    this.caricaProdottiCiondoli();
  }


  caricaProdottiCiondoli(): void {
    const idCategoriaCiondoli = 5; // Usa l'ID della categoria "Ciondoli"
    this.prodottiService.getProdottiByCategoria(idCategoriaCiondoli).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
