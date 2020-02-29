import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private router: Router, private callNumber: CallNumber) { }

  ngOnInit() {
  }

  // Función para llamar al número pasado por parámetro
  llamar() {
    this.callNumber.callNumber("652608248", true)
    .then(res => console.log('Llamada inicializada!', res))
    .catch(err => console.log('Error lanzando la llamada', err));
  }
  
  // Funciones de enrutamiento
  navigateToInicio() {
    this.router.navigate(["/"]);
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

}
