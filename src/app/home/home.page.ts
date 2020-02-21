import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Piezas } from '../piezas';
import { Router } from '@angular/router';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  quotes: any;

  piezaEditando: Piezas;
  arrayColeccionPiezas: any = [{
    id: "",
    data: {} as Piezas
  }];
  idPiezaSelec: string;

  private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10"; 
  
  constructor(private firestoreService: FirestoreService, private router: Router, private socialSharing: SocialSharing) {
    //Creamos una pieza vacía
    this.piezaEditando = {} as Piezas;

    //Obtenemos la lista de tareas
    this.obtenerListaPiezas();
  }

  navigateToPiezaDetalle(id) {
    this.router.navigate(["/piezadetalle/" + id]);
  }

  navigateToConfigurador() {
    this.router.navigate(["/configurador/"]);
  }

  navigateToInformacion() {
    this.router.navigate(["/informacion/"]);
  }

  navigateToAbout() {
    this.router.navigate(["/about/"]);
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
  
  

  clicBotonInsertar() {
    this.firestoreService.insertar("piezas", this.piezaEditando).then(() => {
      console.log('Pieza creada correctamente!');
      this.piezaEditando = {} as Piezas;
    }, (error) => {
      console.error(error);
    });
  }

  selecPieza(piezaSelec) {
    console.log("Pieza seleccionada: ");
    console.log(piezaSelec);
    this.idPiezaSelec = piezaSelec.id;
    console.log(this.idPiezaSelec);
    this.piezaEditando.tipo = piezaSelec.data.tipo;
    this.piezaEditando.modelo = piezaSelec.data.modelo;
    this.piezaEditando.fechalanzamiento = piezaSelec.data.fechalanzamiento;
    this.piezaEditando.precio = piezaSelec.data.precio;
    this.piezaEditando.valoracion = piezaSelec.data.valoracion;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("piezas", this.idPiezaSelec).then(() => {
      //Actualizar la lista completa
      this.obtenerListaPiezas();
      // Limpiar datos de pantalla
      this.piezaEditando = {} as Piezas;
    })
  }
}
