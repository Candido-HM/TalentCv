import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  user!: userModel;
  profileData: profileModel;
  validatorProfile: boolean;
  constructor(  private userService: UserService,
                private profileService: ProfileService) {
    this.profileData = new profileModel('');
    this.validatorProfile = false;
  }

  ngOnInit(): void {
    this.viewUser();
    this.viewProfile();
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
    });
  }

  viewProfile(){
    this.profileService.getProfile().subscribe((data: any) => {
      if(data.success){
        this.profileData = data.data;
        this.validatorProfile = true;
      } else {
        this.validatorProfile = false;
      }
    });
  }
}
