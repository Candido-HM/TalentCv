import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';
import { ProjectService } from 'src/app/services/project.service';
import { projectModel } from 'src/app/models/project.model';
import { ExperienciaFormComponent } from 'src/app/components/experiencia-form/experiencia-form.component';
import { ProjectFormComponent } from 'src/app/components/project-form/project-form.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.sass']
})
export class ExperienciaComponent {
  @ViewChild(ExperienciaFormComponent) experiencieForm!: ExperienciaFormComponent;
  @ViewChild(ProjectFormComponent) projectForm!: ProjectFormComponent;

  public experiences: experienceModel[];
  public projects: projectModel[];
  public experiencie!: experienceModel;
  public project!: projectModel;
  validationExperience: boolean;
  validationProject: boolean;
  idProfile: number;

  constructor( private experienceService: ExperienceService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router){
    this.experiences = [];
    this.projects = [];
    this.validationExperience = false;
    this.validationProject = false;
    this.idProfile = 0;

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

  delete(id: number) {
    this.experienceService.deleteExperience(this.idProfile, id).subscribe( (data: any) => {
      console.log('DELETE');
      console.log(data);
      this.viewExperiencies(this.idProfile);
    })
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

  deleteProject(id: number) {
    this.projectService.deleteProject(this.idProfile, id).subscribe((resp: any) => {
      console.log(resp);
      this.viewProjects(this.idProfile);
    });
  }
}
