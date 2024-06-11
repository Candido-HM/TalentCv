import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  validatorProfile: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private route: ActivatedRoute,
                private router: Router) {
    this.validatorProfile = false;
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewProfile(this.idProfile);
    });
  }

  ngOnInit(): void {
    this.viewUser();
  }

  returnHome() {
    this.router.navigate(['dashboard/home']);
  }

  nextExperience(id: number) {
    this.router.navigate(['dashboard/experiencia', id]);
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
    });
  }

  viewProfile(id: number){
    console.log('VIEWPROFILE ES:', id);

    this.profileService.getProfile(id).subscribe((profile: profileModel) => {
      if(profile){
        this.profile = profile;
        this.idProfile = profile.id;
        // console.log('TRUE: ',profile);
        this.validatorProfile = true;
      } else {
        console.log('FALSE: ',profile);
        this.validatorProfile = false;
      }
    });
  }
  
}
