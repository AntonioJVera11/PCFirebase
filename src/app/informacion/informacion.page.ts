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

  llamar() {
    this.callNumber.callNumber("123456789", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
