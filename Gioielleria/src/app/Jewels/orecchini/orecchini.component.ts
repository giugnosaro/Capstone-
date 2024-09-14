import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/services/prodotti.service';

@Component({
  selector: 'app-orecchini',
  templateUrl: './orecchini.component.html',
  styleUrls: ['./orecchini.component.css']
})
export class OrecchiniComponent implements OnInit {

  prodotti: any[] = [];

  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
      
      this.caricaProdottiOrecchini();
  }


  caricaProdottiOrecchini(): void {
    const idCategoriaOrecchini = 4; // Usa l'ID della categoria "Orecchini"
    this.prodottiService.getProdottiByCategoria(idCategoriaOrecchini).subscribe((data) => {
      this.prodotti = data;
    });
  }

}
