import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.sass']
})
export class LandingPagesComponent {

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['login']);
  }

  redirectRegister() {
    this.router.navigate(['registrarse']);
  }

}
