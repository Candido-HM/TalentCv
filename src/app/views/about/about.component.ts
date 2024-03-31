import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  user: userModel;
  constructor( private profile: ProfileService) {
    this.viewUser();
    this.user = new userModel('');
  }

  ngOnInit(): void {
    // this.viewUser();
    // this.viewProfile();
  }

  viewUser(){
    this.profile.getUser().subscribe( (user: userModel) => {
      // console.log(user.name);
      this.user = user;
    });
  }

  // viewProfile(){
  //   this.profile.getProfile().subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
