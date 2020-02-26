import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Piezas } from '../piezas';
import { FirestoreService } from '../firestore.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

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

  userEmail: String = "";
	userUID: String = "";
	isLogged: boolean

  id=null;
  piezaEditando: Piezas;

  constructor(private activatedRoute: ActivatedRoute, 
    private firestoreService: FirestoreService,
    private router: Router,
	public alertController: AlertController,
	private loadingController: LoadingController,
	private toastController: ToastController,
	private imagePicker: ImagePicker,
	private socialSharing: SocialSharing,
	private authService: AuthService,
	public afAuth: AngularFireAuth) {
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
      this.document.data = {} as Piezas;
    })
    this.navigateToInicio();
  }
  
  clicBotonInsertar() {
    this.firestoreService.insertar("piezas", this.document.data).then(() => {
      console.log('Pieza creada correctamente!');
      this.document.data = {} as Piezas;
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

	
	async uploadImagePicker() {
		// Mensaje de espera mientras se sube la imagen
		const loading = await this.loadingController.create({
			message: 'Espera mientras se sube la imagen...'
		});
		// Mensaje de finalización de subida de la imagen
		const toast = await this.toastController.create({
			message: 'La imagen ha sido añadida correctamente',
			duration: 3000
		});
		// Comprobar si la aplicación tiene permisos de lectura
		this.imagePicker.hasReadPermission().then(
			(result) => {
				// Si no tiene permiso de lectura se solicita al usuario
				if (result == false) {
					this.imagePicker.requestReadPermission();
				}
				else {
					// Abrir selector de imágenes (ImagePicker)
					this.imagePicker.getPictures({
						maximumImagesCount: 1,  // Permitir sólo 1 imagen
						outputType: 1           // 1 = Base64
					}).then(
						(results) => {  // En la variable results se tienen las imágenes seleccionadas
							// Carpeta del Storage donde se almacenará la imagen
							let nombreCarpeta = "imagenes";
							// Recorrer todas las imágenes que haya seleccionado el usuario
							//  aunque realmente sólo será 1 como se ha indicado en las opciones
							for (var i = 0; i < results.length; i++) {
								// Mostrar el mensaje de espera
								loading.present();
								// Asignar el nombre de la imagen en función de la hora actual para
								//  evitar duplicidades de nombres        
								let nombreImagen = `${new Date().getTime()}`;
								// Llamar al método que sube la imagen al Storage
								this.firestoreService.uploadImage(nombreCarpeta, nombreImagen, results[i])
									.then(snapshot => {
										snapshot.ref.getDownloadURL()
											.then(downloadURL => {
												// En la variable downloadURL se tiene la dirección de descarga de la imagen
												console.log("downloadURL:" + downloadURL);
												this.document.data.foto = downloadURL;
												// Mostrar el mensaje de finalización de la subida
												toast.present();
												// Ocultar mensaje de espera
												loading.dismiss();
											})
									})
							}
						},
						(err) => {
							console.log(err)
						}
					);
				}
			}, (err) => {
				console.log(err);
			});
	}

	async deleteFile(fileURL) {
		const toast = await this.toastController.create({
			message: 'La imagen ha sido eliminada.',
			duration: 3000
		});
		this.firestoreService.deleteFileFromURL(fileURL)
			.then(() => {
				toast.present();
			}, (err) => {
				console.log(err);
			});
		this.document.data.foto = undefined;
	}

	
	componerMsg(){
		var msg = 'La pieza de tipo ' + this.document.data.tipo + ' y modelo ' + this.document.data.modelo + '\n'
		+ 'ha recibido una valoración de ' + this.document.data.valoracion  + ' por su salida a mercado en ' + this.document.data.fechalanzamiento + ' por el precio de ' + this.document.data.precio + '€. Enviado desde la app PC Hardware de Antonio Juan Vera Muñoz';
		return msg;
	}

	regularShare(){
		
		let msg = this.componerMsg();

		this.socialSharing.share(msg, null, null, null);
	}

	twitterShare(){
		
		let msg = this.componerMsg();

		this.socialSharing.shareViaTwitter(msg, null, null);
	}

	whatsappShare(){
		
		let msg = this.componerMsg();

		this.socialSharing.shareViaWhatsApp(msg, null, null);
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
}
