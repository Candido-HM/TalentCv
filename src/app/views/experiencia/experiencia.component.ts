import { Component } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';
import { ProjectService } from 'src/app/services/project.service';
import { projectModel } from 'src/app/models/project.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.sass']
})
export class ExperienciaComponent {
  public experiences: experienceModel[];
  public projects: projectModel[];
  public experiencie!: experienceModel;
  public project!: projectModel;
  validationExperience: boolean;
  validationProject: boolean;

  constructor( private experienceService: ExperienceService,
                private projectService: ProjectService ){
    this.experiences = [];
    this.projects = [];
    this.validationExperience = false;
    this.validationProject = false;
    this.viewExperiencies();
    this.viewProjects();
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
