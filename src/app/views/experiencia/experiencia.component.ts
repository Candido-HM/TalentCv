import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor( private experienceService: ExperienceService,
                private projectService: ProjectService,
                private router: Router ){
    this.experiences = [];
    this.projects = [];
    this.validationExperience = false;
    this.validationProject = false;
    this.viewExperiencies();
    this.viewProjects();
  }

  returnProfile() {
    this.router.navigate(['dashboard/profile']);
  }

  nextFormation() {
    this.router.navigate(['dashboard/formacion']);
  }

  cleanExperience() {
    this.experiencieForm.createExperiencie();
  }

  viewExperiencies() {
    this.experienceService.getExperiences().subscribe( (data: any) => {
      this.experiences = data.data;
      if(this.experiences) {
        this.validationExperience = true;
      }
    })
  }

  viewExperiencie(id: number) {
    this.experienceService.getExperience(id).subscribe( (experience: experienceModel) => {
      this.experiencie = experience;
      console.log('VIEW: ',this.experiencie);
    })
  }

  delete(id: number) {
    this.experienceService.deleteExperience(id).subscribe( (data: any) => {
      console.log('DELETE');
      console.log(data);
      this.viewExperiencies();
    })
  }

  cleanProject() {
    this.projectForm.createProject();
  }

  viewProjects() {
    this.projectService.getProjects().subscribe( (data: any) => {
      this.projects = data.data;
      if (this.projects) {
        this.validationProject = true;
      }
    });
  }

  viewProject(id: number) {
    this.projectService.getProject(id).subscribe( (project: projectModel) => {
      this.project = project;
      console.log(project);
    });
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe((resp: any) => {
      console.log(resp);
      this.viewProjects();
    });
  }
}
