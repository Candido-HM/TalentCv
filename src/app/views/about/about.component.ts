import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent {

  constructor( private profile: ProfileService) {
    this.viewProfile();
  }

  viewProfile(){
    this.profile.getProfile().subscribe(data => {
      console.log(data);
    });
  }
}
