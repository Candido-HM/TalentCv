import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loginModel } from 'src/app/models/loginUser.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {
  formLogin!: FormGroup; 
  constructor( private formBuilder: FormBuilder,
                private router: Router,
                private auth: AuthService) {
    this.createFormLogin();
  }

  invalidField( campo: string){
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }

  createFormLogin(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    })
  }

  login(){
    console.log( this.formLogin)
    const formData: loginModel = this.formLogin.value
    console.log(formData);
    if(this.formLogin.invalid) {
      return this.formLogin.markAllAsTouched();
    } 
    this.auth.login(formData).subscribe(response => {
      // console.log(response);
      this.router.navigateByUrl('/profile');
    })

  }
}
