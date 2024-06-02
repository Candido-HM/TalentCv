import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  profile!: profileModel;
  profile1!: profileModel;
  validatorProfile: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private route: ActivatedRoute) {
    this.validatorProfile = false;
    this.idProfile = 0;
  }

  ngOnInit(): void {
    this.viewUser();
    this.viewProfile();
    // this.viewProfile1();

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewProfile1(this.idProfile)
      console.log('ES EL ID->PROFILE: ',this.idProfile);
    });
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
    });
  }

  viewProfile(){
    this.profileService.getProfile().subscribe((profile: profileModel) => {
      if(profile){
        this.profile = profile;
        this.validatorProfile = true;
      } else {
        this.validatorProfile = false;
      }
    });
  }

  viewProfile1(id: number){
    this.profileService.getProfile1(id).subscribe((profile: profileModel) => {
      if(profile){
        this.profile1 = profile;
        console.log('YA SE ARMO: ', profile)
        this.validatorProfile = true;
      } else {
        this.validatorProfile = false;
      }
    });
  }
}
