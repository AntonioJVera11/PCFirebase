import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
//export class LoginPage implements OnInit {
export class LoginPage {

  // Validación del formulario y mensaje de error vacío
  validations_form: FormGroup;
  errorMessage: string = '';

  // Mensaje de validación
  validation_messages = {
   'email': [
     { type: 'required', message: 'Necesitamos tu email.' },
     { type: 'pattern', message: 'Introduce un email válido.' }
   ],
   'password': [
     { type: 'required', message: 'Necesitamos tu contraseña.' },
     { type: 'minlength', message: 'La contraseña debe tener al menos 4 caracteres.' }
   ]
 };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // Validación de los datos introducidos en el formulario
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  // Inicio de sesión
  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(["/home"]);
    }, err => {
      this.errorMessage = err.message;
      console.log(err)
    })
  }

  // Funciones de enrutamiento
  goRegisterPage(){
    this.router.navigate(["/register"]);
  }

  navigateToInicio() {
    this.router.navigate(["/"]);
  }
}