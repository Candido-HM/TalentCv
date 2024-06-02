import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  public profiles: profileModel[];
  public profile!: profileModel;

  constructor(private router: Router,
    private profileService: ProfileService
  ) {
    this.profiles = [];

    this.viewProfiles();
  }

  viewProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data.data;
      // console.log(this.profiles);
    })
  }

  redirect(id: number) {
    this.router.navigate(['dashboard/profile/', id]);
  }

  viewProfile(id: number){
    this.profileService.getProfile1(id).subscribe((profile: profileModel) => {
      // if(profile){
        this.profile = profile;
        // console.log('PROFILE: ', profile);
        this.router.navigate(['dashboard/profile/', id]);
        // this.validatorProfile = true;
      // } else {
        // this.validatorProfile = false;
      // }
    });
  }

}
