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
  idPiezaSelec: string;

  constructor(private firestoreService: FirestoreService) {
    //Creamos una pieza vacía
    this.piezaEditando = {} as Piezas;

    //Obtenemos la lista de tareas
    this.obtenerListaPiezas();
  }

  
  arrayColeccionPiezas: any = [{
    id: "",
    data: {} as Piezas
   }];


  clicBotonInsertar() {
    this.firestoreService.insertar("piezas", this.piezaEditando).then(() => {
      console.log('Pieza creada correctamente!');
      this.piezaEditando = {} as Piezas;
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("piezas", this.idPiezaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaPiezas();
      // Limpiar datos de pantalla
      this.piezaEditando = {} as Piezas;
    })
  }

  obtenerListaPiezas(){
    this.firestoreService.consultar("piezas").subscribe((resultadoConsultaPiezas) => {
      this.arrayColeccionPiezas = [];
      resultadoConsultaPiezas.forEach((datosPiezas: any) => {
        this.arrayColeccionPiezas.push({
          id: datosPiezas.payload.doc.id,
          data: datosPiezas.payload.doc.data()
        });
      })
    });
  }

  selecPieza(piezaSelec) {
    console.log("Pieza seleccionada: ");
    console.log(piezaSelec);
    this.idPiezaSelec = piezaSelec.id;
    this.piezaEditando.titulo = piezaSelec.data.titulo;
    this.piezaEditando.descripcion = piezaSelec.data.descripcion;
  }

}
