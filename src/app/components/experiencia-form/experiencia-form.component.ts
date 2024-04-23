import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.sass']
})
export class ExperienciaFormComponent implements OnChanges {
  @Input() dataExperiencie: any;

  formExperience!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private experienceService: ExperienceService) {
    this.createExperiencie();
  }

  ngOnChanges(): void {
    this.getExperiencie();
  }

  campoNoValido(campo: string) {
    return this.formExperience.get(campo)?.invalid && this.formExperience.get(campo)?.touched;
  }

  getExperiencie() {
    if(this.formExperience) {
      this.formExperience.reset({
        cargo: this.dataExperiencie?.cargo,
        company_name: this.dataExperiencie?.company_name,
        status: this.dataExperiencie?.status,
        start_date: this.dataExperiencie?.start_date,
        finish_date: this.dataExperiencie?.finish_date,
        description: this.dataExperiencie?.description
      });
    }
  }

  createExperiencie() {
    this.formExperience = this.formBuilder.group({
      cargo: ['', [Validators.required, Validators.minLength(5)]],
      company_name: ['', [Validators.required, Validators.minLength(5)]],
      status: ['' , [Validators.required]],
      start_date: ['', [Validators.required]],
      finish_date: [''],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  save() {
    console.log(this.formExperience);
    const experience: experienceModel = this.formExperience.value;
    if(this.formExperience.invalid) {
      this.formExperience.markAllAsTouched();
    }

    if( this.dataExperiencie && this.dataExperiencie.id) {
      this.experienceService.updateExperience(this.dataExperiencie.id, experience).subscribe((res: any) => {
        console.log('Registro actualizado');
        console.log(res);
      });
    } else {
      console.log('GUARDAR REGISTRO');
      this.experienceService.saveExperience(experience).subscribe((res: any) => {
        console.log(res);
      });
    }
  }

}
