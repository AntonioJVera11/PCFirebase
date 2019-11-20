import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Piezas } from '../piezas';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-piezadetalle',
  templateUrl: './piezadetalle.page.html',
  styleUrls: ['./piezadetalle.page.scss'],
})
export class PiezadetallePage implements OnInit {

  document: any = {
    id: "",
    data: {} as Piezas
  }

  id=null;
  piezaEditando: Piezas;

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService) {
    this.piezaEditando = {} as Piezas;

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.firestoreService.consultarPorId("piezas", this.id).subscribe((resultado) => {
    // Preguntar si se hay encontrado un document con ese ID
    if(resultado.payload.data() != null) {
      this.document.id = resultado.payload.id
      this.document.data = resultado.payload.data();
    } else {
      // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
      this.document.data = {} as Piezas;
    } 
  });
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("piezas", this.id).then(() => {
      // Limpiar datos de pantalla
      this.piezaEditando = {} as Piezas;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("piezas", this.id, this.piezaEditando).then(() => {
      // Limpiar datos de pantalla
      this.piezaEditando = {} as Piezas;
    })
  }

}
