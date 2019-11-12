import { Component } from '@angular/core';

import { FirestoreService } from '../firestore.service';

import { Piezas } from '../piezas';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  piezaEditando: Piezas;

  constructor(private firestoreService: FirestoreService) {
    //Creamos una pieza vacía
    this.piezaEditando = {} as Piezas;
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("piezas", this.piezaEditando).then(() => {
      console.log('Pieza creada correctamente!');
      this.piezaEditando = {} as Piezas;
    }, (error) => {
      console.error(error);
    });
  }

}
