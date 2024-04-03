import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  user: userModel;
  profileData: profileModel;
  validatorProfile: boolean;
  constructor( private profile: ProfileService) {
    this.viewUser();
    this.user = new userModel('');
    this.profileData = new profileModel('');
    this.validatorProfile = false;
  }

  ngOnInit(): void {
    this.viewProfile();
  }

  viewUser(){
    this.profile.getUser().subscribe( (user: userModel) => {
      this.user = user;
    });
  }

  viewProfile(){
    this.profile.getProfile().subscribe((data: any) => {
      if(data.success){
        this.profileData = data.data;
        this.validatorProfile = true;
      } else {
        this.validatorProfile = false;
      }
    });
  }
}
