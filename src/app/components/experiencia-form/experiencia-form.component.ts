import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { experienceModel } from 'src/app/models/experience.model';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.sass']
})
export class ExperienciaFormComponent implements OnChanges {
  @Input() dataExperiencie: any;
  @Output() loadingExperience = new EventEmitter();

  idProfile: number;
  formExperience!: FormGroup;

  constructor( private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private experienceService: ExperienceService,
                private closeModal: CloseModalService) {
    this.createExperiencie();
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
    });
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
    // console.log(this.formExperience);
    console.log('EL ID DESDE EL MODAL->SAVE: ', this.idProfile);
    const experience: experienceModel = this.formExperience.value;
    if(this.formExperience.invalid) {
      this.formExperience.markAllAsTouched();
      return; //Detenemos la ejecución si el formulario no es válido.
    }

    if( this.dataExperiencie && this.dataExperiencie.id != 0) {
      this.experienceService.updateExperience( this.idProfile, this.dataExperiencie.id, experience).subscribe((res: any) => {
        console.log(res);
        this.dataExperiencie.id = null;
        this.loadingExperience.emit();
        this.closeModal.close('modalExperiencia');
      });
      console.log('Registro actualizado', this.dataExperiencie);
    } else {
      console.log('GUARDAR REGISTRO');
      this.experienceService.saveExperience(this.idProfile, experience).subscribe((res: any) => {
        this.loadingExperience.emit(res);
        this.closeModal.close('modalExperiencia');
      });
    }
  }

}
