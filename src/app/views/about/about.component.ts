import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { profileModel } from 'src/app/models/profile.model';

import { ApiCountryService } from 'src/app/services/api-country.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  countries!: any[];
  user!: userModel;
  profile!: profileModel;
  validatorProfile: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private apiCountry: ApiCountryService,
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
    this.viewCountries();
  }

  returnHome() {
    this.router.navigate(['home']);
  }

  nextExperience(id: number) {
    this.router.navigate(['experiencia', id]);
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
        
        this.validatorProfile = true;
      } else {
        console.log('FALSE: ',profile);
        this.validatorProfile = false;
      }
    });
  }

  /* Obtener datos de ubicacion */
  viewCountries() {
    this.apiCountry.getCountries().subscribe((data : any) => {
      console.log(data);
    })
  }
}
