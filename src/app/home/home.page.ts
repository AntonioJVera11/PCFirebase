import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Piezas } from '../piezas';
import { Router } from '@angular/router';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';


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

  userEmail: String = "";
  userUID: String = ""; 
  isLogged: boolean;

  private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10"; 
  
  constructor(private firestoreService: FirestoreService, private router: Router, private socialSharing: SocialSharing,
    private authService: AuthService, public afAuth: AngularFireAuth, private toastController: ToastController) {
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
    this.piezaEditando.foto = piezaSelec.data.foto;
  }

  ionViewDidEnter() {
		this.isLogged = false;
		this.afAuth.user.subscribe(user => {
		  if(user){
			this.userEmail = user.email;
			this.userUID = user.uid;
			this.isLogged = true;
		  }
		})
	  }

	  async logout(){
		const toast = await this.toastController.create({
			message: 'Has cerrado sesión',
			duration: 3000
		});

		this.authService.doLogout()
		.then(res => {
		  this.userEmail = "";
		  this.userUID = "";
		  this.isLogged = false;
		  console.log(this.userEmail);
		  toast.present();
		}, err => console.log(err));
    }
    
    navigateToLogin() {
      this.router.navigate(["/login/"]);
    }


}
