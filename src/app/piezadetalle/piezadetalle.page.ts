import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piezas } from '../piezas';
import { FirestoreService } from '../firestore.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private activatedRoute: ActivatedRoute, 
    private firestoreService: FirestoreService,
    private router: Router,
    public alertController: AlertController) {
      this.piezaEditando = {} as Piezas;
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

  ngOnInit() {
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("piezas", this.id).then(() => {
      // Limpiar datos de pantalla
      this.piezaEditando = {} as Piezas;
    })
    this.navigateToInicio();
  }
  
  clicBotonInsertar() {
    this.firestoreService.insertar("piezas", this.document.data).then(() => {
      console.log('Pieza creada correctamente!');
      this.piezaEditando = {} as Piezas;
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("piezas", this.id, this.document.data).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Piezas;
      this.navigateToInicio();
    })
  }

  navigateToInicio() {
    this.router.navigate(["/"]);
  }

  async alertaInsertar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres añadir la pieza <strong>'+ this.document.data.modelo +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonInsertar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
  }
  
  async alertaModificar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres confirmar los cambios en la pieza <strong>'+ this.document.data.modelo +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonModificar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
  }
  
  async alertaBorrar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres borrar la pieza <strong>'+ this.document.data.modelo +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToInicio();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Borrar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonBorrar();
						this.navigateToInicio();
					}
				}
			]
		});

		await alert.present();
	}
}
