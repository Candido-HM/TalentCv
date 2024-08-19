import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { loginModel } from 'src/app/models/loginUser.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  loading: boolean;
  userToken: any;
  formLogin!: FormGroup; 

  constructor( private formBuilder: FormBuilder,
                private router: Router,
                private auth: AuthService) {
    this.loading = false;
    this.userToken = '';
    this.createFormLogin();
    this.loadingToken();
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
    this.loading = true;
    const formData: loginModel = this.formLogin.value;
    if(this.formLogin.invalid) {
      this.loading = false;
      return this.formLogin.markAllAsTouched();
    } 
    console.log('Soy el LOGIN:');
    // this.auth.login(formData).subscribe((res: any) => {
    //   this.loading = true;
    //   if(res.status == true) {
    //     this.auth.saveToken(res.access_token);
    //     this.router.navigate(['home']);
    //   }
    //   else {
    //     console.log('¡El usuario al que quiere ingresar no existe!');
    //     this.loading = false;
    //   }
    // })

    /************** */
    this.auth.login(formData).subscribe({
      next: (res: any) => {
        // Maneja la respuesta exitosa aquí
        this.loading = true;
        if (res.status === true) {
          this.auth.saveToken(res.access_token);
          this.router.navigate(['home']);
        } else {
          console.log('¡El usuario al que quiere ingresar no existe!');
          this.loading = false;
        }
      },
      error: (err: HttpErrorResponse) => {
        // Maneja el error aquí
        this.loading = false;
        if (err.status === 401) {
          console.error('Error de autenticación:', err.error.message);
        } else {
          console.error('Otro tipo de error:', err);
        }
      }
    });
  }


  loadingToken() {
    let token = this.auth.leerToken();
    if(token !== ''){
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
