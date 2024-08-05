import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';
import { ProjectService } from 'src/app/services/project.service';
import { projectModel } from 'src/app/models/project.model';
import { ExperienciaFormComponent } from 'src/app/components/experiencia-form/experiencia-form.component';
import { ProjectFormComponent } from 'src/app/components/project-form/project-form.component';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { AlertsComponent } from 'src/app/shared/alerts/alerts.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.sass']
})
export class ExperienciaComponent {
  @ViewChild(ExperienciaFormComponent) experiencieForm!: ExperienciaFormComponent;
  @ViewChild(ProjectFormComponent) projectForm!: ProjectFormComponent; 
  @ViewChild(ConfirmationComponent) modalClose!: ConfirmationComponent;
  @ViewChild(AlertsComponent) showNotification!: AlertsComponent;

  public experiences: experienceModel[];
  public projects: projectModel[];
  public experiencie!: experienceModel;
  public project!: projectModel;
  public modalName: string;
  public modalType: string;
  validationExperience: boolean;
  validationProject: boolean;
  idProfile: number;
  idExperience: number = 0;
  idProject: number = 0;
  resNotification: string;

  constructor( private experienceService: ExperienceService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router){
    this.experiences = [];
    this.projects = [];
    this.validationExperience = false;
    this.validationProject = false;
    this.idProfile = 0;
    this.modalName = '';
    this.modalType = '';
    this.resNotification = '';

    this.route.params.subscribe( params =>  {
      this.idProfile = params['id'];
      console.log('IDPROFILE DESDE ABOUT: ',this.idProfile)
      this.viewExperiencies(this.idProfile);
      this.viewProjects(this.idProfile);
    });
  }

  returnProfile() {
    this.router.navigate(['profile', this.idProfile]);
  }

  nextFormation() {
    this.router.navigate(['formacion', this.idProfile]);
  }

  cleanExperience() {
    this.experiencieForm.createExperiencie();
    this.experiencie.id = 0;
    console.log('ID EXPERIENCIA:',this.experiencie.id);
  }

  viewExperiencies(idProfile: number) {
    this.experienceService.getExperiences(idProfile).subscribe( (data: any) => {
      this.experiences = data.data;
      if(this.experiences) {
        this.validationExperience = true;
      }
    })
  }

  viewExperiencie(id: number) {
    this.experienceService.getExperience(this.idProfile, id).subscribe( (experience: experienceModel) => {
      this.experiencie = experience;
      console.log('VIEW: ',this.experiencie);
    })
  }

  confirmationExperience(id: number, cargo: string){
    this.modalType = 'experiencia';
    this.modalName = cargo;
    this.idExperience = id;
  }

  delete(id: number) {
    this.experienceService.deleteExperience(this.idProfile, id).subscribe( (res: any) => {
      console.log(res);
      this.resNotification = res.message;
      this.viewExperiencies(this.idProfile);
      this.modalClose.closeModal();
      this.notificationAlert(this.resNotification);
      console.log('DELETE EXPERIENCIA: ',id);
    });
  }

  cleanProject() {
    this.projectForm.createProject();
    this.project.id = 0;
    console.log('ID PROYECTO:',this.project.id);
  }

  viewProjects(idProfile: number) {
    this.projectService.getProjects(idProfile).subscribe( (data: any) => {
      this.projects = data.data;
      if (this.projects) {
        this.validationProject = true;
      }
    });
  }

  viewProject(id: number) {
    this.projectService.getProject(this.idProfile, id).subscribe( (project: projectModel) => {
      this.project = project;
      console.log(project);
    });
  }

  confirmationProject(id: number, name: string){
    this.modalType = 'proyecto';
    this.modalName = name;
    this.idProject = id;
    console.log('CONFIRMA: ', this.idProject);
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(this.idProfile, id).subscribe((res: any) => {
      console.log(res);
      this.resNotification = res.message;
      this.viewProjects(this.idProfile);
      this.modalClose.closeModal();
      this.notificationAlert(this.resNotification);
    });
    console.log('DELETE PROYECTO: ',id);
  }

  validationConfirmation(action: string) {
    console.log('ACTION:',action)
    if ( action === 'experiencia') {
      this.delete(this.idExperience);
    } else if ( action  === 'proyecto') {
      this.deleteProject(this.idProject);
    }
  }

  notificationAlert(data: string) {
    this.resNotification = data;
    console.log('RECIBI EL EVENTO DEL FORMULARIO: ', data);
    this.showNotification.show();
  }
}
