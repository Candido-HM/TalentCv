import { Component, ViewChild } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.sass']
})
export class ExperienciaComponent {
  public experiences: experienceModel[];
  public experiencie!: experienceModel;
  validationExperience: boolean;

  constructor( private experienceService: ExperienceService){
    this.validationExperience = false;
    this.viewExperiencies();
    this.experiences = [];
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
    })
  }

}
