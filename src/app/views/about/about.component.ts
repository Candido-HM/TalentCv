import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { profileModel } from 'src/app/models/profile.model';

import { UbicationService } from 'src/app/services/ubication.service';
import { ubicationModel } from 'src/app/models/ubication.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  countries!: any[];
  user!: userModel;
  profile!: profileModel;
  ubication!: ubicationModel;
  validatorProfile: boolean;
  validatorUbication: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private ubicationService: UbicationService,
                private route: ActivatedRoute,
                private router: Router) {
    this.validatorProfile = false;
    this.validatorUbication = false;
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewProfile(this.idProfile);
    });
  }

  ngOnInit(): void {
    this.viewUser();
    this.viewUbication();
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

  /******************Cargar Ubicacion ************/
  viewUbication() {
    this.ubicationService.getUbication().subscribe((ubication: ubicationModel) => {
      if(ubication) {
        this.ubication = ubication;
        this.validatorUbication = true;
      }
      
      // console.log(this.ubication.country);
      // console.log(this.ubication.state);
      // console.log(this.ubication.city);
    })
  }

}
