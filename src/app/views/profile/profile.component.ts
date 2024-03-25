import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {

  constructor( private auth: AuthService) {
    // this.autenticado();
  }
  // autenticado() {
  //   let auto = this.auth.authenticated();
  //   // console.log('Result autenticado: '+auto);
  // }

}
