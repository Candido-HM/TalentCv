import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent {

  constructor( private router: Router,
                private auth: AuthService) { }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
