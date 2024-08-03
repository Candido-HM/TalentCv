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
  contactInfo: boolean;
  validatorPhone: boolean;
  validatorPortfolio: boolean;
  validatorLinkedin: boolean;
  validatorLink: boolean;
  validatorGithub: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private ubicationService: UbicationService,
                private route: ActivatedRoute,
                private router: Router) {
    this.validatorProfile = false;
    this.validatorUbication = false;
    this.contactInfo = false;
    this.validatorPhone = false;
    this.validatorPortfolio = false;
    this.validatorLinkedin = false;
    this.validatorLink = false;
    this.validatorGithub = false;
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewProfile(this.idProfile);
    });

    // this.viewUbication();
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
      const validateId = (item: any): boolean => {
        return item && item.id !== null;
      };
      this.validatorPhone = validateId(this.user.phone);
      this.validatorPortfolio = validateId(this.user.portfolio);
      this.validatorLinkedin = validateId(this.user.linkedin);
      this.validatorGithub = validateId(this.user.github);
      this.validatorLink = validateId(this.user.link);

      this.contactInfo = this.validatorPhone || this.validatorPortfolio || this.validatorLinkedin || this.validatorLinkedin || this.validatorGithub || this.validatorLink;
    });
  }

  viewProfile(id: number){
    // console.log('VIEWPROFILE ES:', id);

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
    this.ubicationService.getUbication().subscribe((ubication) => {
      this.ubication = ubication;
      console.log('SALUDOS CRACKS: ', ubication);
      let verify = ubication.id;
      if (verify != undefined) {
        this.validatorUbication = true;
      }
    });
  }
}
