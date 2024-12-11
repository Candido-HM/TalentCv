import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { profileModel } from 'src/app/models/profile.model';

import { UbicationService } from 'src/app/services/ubication.service';
import { ubicationModel } from 'src/app/models/ubication.model';
import { AlertsComponent } from 'src/app/shared/alerts/alerts.component';

import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})

export class AboutComponent implements OnInit, OnChanges {
  @ViewChild(AlertsComponent) showNotification!: AlertsComponent;

  countries!: any[];
  talents!: any[];
  editIndex: number | null = null;
  skillBtn: boolean;

  user!: userModel;
  profile!: profileModel;
  ubication!: ubicationModel;
  contacto!: any;

  validatorProfile: boolean;
  validatorUbication: boolean;
  contactInfo: boolean;
  validatorPhone: boolean;
  validatorLinkedin: boolean;
  validatorLink: boolean;
  validatorGithub: boolean;

  idProfile: number;
  resNotification: string;

  formSkill!: FormGroup;

  constructor(  private userService: UserService,
    private profileService: ProfileService,
    private ubicationService: UbicationService,
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  this.validatorProfile = false;
  this.validatorUbication = false;
  this.contactInfo = false;
  this.validatorPhone = false;
  this.validatorLinkedin = false;
  this.validatorLink = false;
  this.validatorGithub = false;
  this.skillBtn = true;
  this.idProfile = 0;
  this.resNotification = '';

  this.route.params.subscribe( params => {
  this.idProfile = params['id'];
  this.viewProfile(this.idProfile);
  });
  this.createSkill();
}

  ngOnInit(): void {
    this.viewUser();
    this.viewUbication();
    this.viewSkill();
  }

  ngOnChanges(): void {
    // this.getSkill();
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
      this.contacto = {
        phone: user.phone,
        link: user.link,
        linkedin: user.linkedin,
        github: user.github
      };
      // console.log(this.contacto);
      const validateId = (item: any): boolean => {
        return item && item.id !== null;
      };
      this.validatorPhone = validateId(this.user.phone);
      this.validatorLinkedin = validateId(this.user.linkedin);
      this.validatorGithub = validateId(this.user.github);
      this.validatorLink = validateId(this.user.link);

      this.contactInfo = this.validatorPhone || this.validatorLinkedin || this.validatorLinkedin || this.validatorGithub || this.validatorLink;
    });
  }

  viewProfile(id: number){

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
      // console.log('SALUDOS CRACKS: ', ubication);
      let verify = ubication.id;
      if (verify != undefined) {
        this.validatorUbication = true;
      }
    });
  }

  notificationAlert(data: string) {
    this.resNotification = data;
    console.log('RECIBI EL EVENTO DEL FORMULARIO: ', data);
    this.showNotification.show();
  }

  /********************* Todo relacionado a TALENTS *******************/
  viewSkill() {
    this.skillService.getSkills(this.idProfile).subscribe((res: any) => {
      // console.log('SOY UN CRACK CON LAS SKILLS:', res.data.talents);
      this.talents = res.data.talents;
      // console.log('SOY UN CRACK CON LAS SKILLS:', this.talents);
    });
  }

  editSkill(id: number) {
    this.editIndex = id;
    // console.log('EL TALENTO ES EL:: ID', this.editIndex);
    this.formSkill.reset({
      skill: this.talents[this.editIndex]
    });
    // this.skillBtn = false;
  }

  createSkill() {
    this.formSkill = this.formBuilder.group({
      skill: ['']
    });
  }

  saveSkill(){
    this.editIndex = null;
    this.skillBtn = true;
    console.log('SKILL GUARDADO');
  }

}
