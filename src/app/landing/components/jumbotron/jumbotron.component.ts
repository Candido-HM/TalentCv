import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.sass']
})
export class JumbotronComponent {

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['login']);
  }

  redirectRegister() {
    this.router.navigate(['registrarse']);
  }

}
