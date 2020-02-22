import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Map,tileLayer,marker} from 'leaflet';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  map:Map;
  newMarker:any;
  address:string[];

  constructor(private router: Router) { }

    // The below function is added
    ionViewDidEnter(){
      this.loadMap();
    }
   // The below function is added
   loadMap() {
    this.map = new Map("mapId").setView([36.679617, -5.444745], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>' })
      .addTo(this.map); 
      
      this.newMarker = marker([36.679617, -5.444745], {draggable: 
        true}).addTo(this.map);
  }

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
