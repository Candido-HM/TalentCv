import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent {
  // userToken: any;
  // formLogin!: FormGroup; 

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['login']);
  }

  redirectRegister() {
    this.router.navigate(['registrarse']);
  }

}
