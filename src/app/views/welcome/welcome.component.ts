import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {

  constructor(private router: Router,
    private auth: AuthService) { 
      this.autenticado();
    }

    autenticado() {
      this.auth.leerToken();
      let verificado = this.auth.authenticated()
      if( verificado === true){
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['']);
      }
      // console.log(verificado);
    }
  

  redirect() {
    this.router.navigate(['login']);
  }

  redirectRegister() {
    this.router.navigate(['registrarse']);
  }

}
