import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurador',
  templateUrl: './configurador.page.html',
  styleUrls: ['./configurador.page.scss'],
})
export class ConfiguradorPage implements OnInit {

  constructor(private router: Router) { }

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

}
