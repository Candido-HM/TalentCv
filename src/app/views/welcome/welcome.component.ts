import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {
  formLogin!: FormGroup; 
  constructor( private formBuilder: FormBuilder) {
    this.createFormLogin();
  }

  invalidField( campo: string){
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }

  createFormLogin(){
    this.formLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    })
  }

  login(){
    console.log( this.formLogin)
  }
}
