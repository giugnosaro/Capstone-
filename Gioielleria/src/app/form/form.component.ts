import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  prodottoForm: FormGroup;
  categorie: any[] = [];
  prodotti: any[] = []; // Aggiungi questa variabile per memorizzare i prodotti
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private prodottiService: ProdottiService
  ) {
    this.prodottoForm = this.fb.group({
      nome: ['', Validators.required],
      descrizione: ['', Validators.required],
      prezzo: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      idCategoria: ['', Validators.required],
      immagine: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadCategorie();
    this.loadProdotti(); // Carica i prodotti al momento dell'inizializzazione
  }

  loadCategorie(): void {
    this.prodottiService.getCategorie().subscribe(
      (data: any[]) => {
        this.categorie = data;
      },
      (error) => {
        console.error('Errore durante il recupero delle categorie', error);
      }
    );
  }

  loadProdotti(): void {
    this.prodottiService.getProdotti().subscribe(
      (data: any[]) => {
        this.prodotti = data;
      },
      (error) => {
        console.error('Errore durante il recupero dei prodotti', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1]; // Ottieni la stringa base64
        this.prodottoForm.get('immagine')?.setValue(base64String); // Imposta il valore della stringa base64 nel form
      };
      reader.readAsDataURL(file); // Leggi il file come URL di dati (base64)
      this.selectedImage = file; // Imposta l'immagine selezionata
      console.log('Immagine selezionata:', this.selectedImage); // Log per verificare l'immagine selezionata
    } else {
      this.selectedImage = null;
      console.error('Nessun file selezionato');
    }
  }
  
  

  onSubmit(): void {
    if (this.prodottoForm.invalid) {
      console.error('Form non valido:', this.prodottoForm.errors); 
      return;
    }
  
    if (!this.selectedImage) {
      console.error('Immagine non selezionata');
      return;
    }
  
    const prodotto = this.prodottoForm.value;
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      prodotto.immagine = e.target.result.split(',')[1]; // Imposta solo la parte base64
  
      // Verifica che l'immagine non sia null prima di chiamare il servizio
      if (this.selectedImage) {
        this.prodottiService.addProdotto(prodotto, this.selectedImage).subscribe(
          (response) => {
            console.log('Prodotto caricato con successo!', response);
          },
          (error) => {
            console.error('Errore durante il caricamento del prodotto', error);
          }
        );
      }
    };
    reader.readAsDataURL(this.selectedImage); // Leggi l'immagine come URL di dati
  }
  

  
  
}
