import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.sass']
})
export class ExperienciaFormComponent {

  formExperience!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private experienceService: ExperienceService) {
    this.createExperiencie();
  }

  campoNoValido(campo: string) {
    return this.formExperience.get(campo)?.invalid && this.formExperience.get(campo)?.touched;
  }

  createExperiencie() {
    this.formExperience = this.formBuilder.group({
      cargo: ['', [Validators.required, Validators.minLength(5)]],
      company_name: ['', [Validators.required, Validators.minLength(5)]],
      status: [false],
      start_date: ['', [Validators.required]],
      finish_date: [''],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  save() {
    this.formExperience.markAllAsTouched();
    console.log(this.formExperience);
    const validationStatus = this.formExperience.value.status ? 'Laborando' : 'Finalizado';
    const experience: experienceModel = this.formExperience.value;
    experience.status = validationStatus;
    this.experienceService.saveExperience(experience).subscribe((res: any) => {
      console.log(res);
    });
  }

}
