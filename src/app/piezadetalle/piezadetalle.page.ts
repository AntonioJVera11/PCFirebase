import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piezadetalle',
  templateUrl: './piezadetalle.page.html',
  styleUrls: ['./piezadetalle.page.scss'],
})
export class PiezadetallePage implements OnInit {

  id=null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

}
