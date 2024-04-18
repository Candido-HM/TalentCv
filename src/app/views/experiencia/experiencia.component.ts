import { Component } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.sass']
})
export class ExperienciaComponent {
  public experiences: experienceModel[];
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
    console.log('EXPERIENCIA ID:'+ id);
    this.experienceService.getExperience(id).subscribe( (data: experienceModel) => {
      console.log('VIEW: ',data);
    })
  }

}
