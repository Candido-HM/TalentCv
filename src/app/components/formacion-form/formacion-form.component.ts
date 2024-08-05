import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { FormationService } from 'src/app/services/formation.service';
import { formationModel } from 'src/app/models/formation.model';

@Component({
  selector: 'app-formacion-form',
  templateUrl: './formacion-form.component.html',
  styleUrls: ['./formacion-form.component.sass']
})
export class FormacionFormComponent implements OnChanges {
  @Input() dataFormation: any;
  @Output() loadingFormations = new EventEmitter();
  @Output() notification = new EventEmitter<string>();

  formFormation!: FormGroup;
  idProfile: number;
  resAlert: string;

  constructor(  private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private formationService: FormationService,
                private closeModal: CloseModalService) {
    this.createFormation();
    this.idProfile = 0;
    this.resAlert = '';

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
    });
  }

  ngOnChanges() {
    this.getFormation();
  }

  campoNoValido(campo: string) {
    return this.formFormation.get(campo)?.invalid && this.formFormation.get(campo)?.touched;
  }

  getFormation() {
    this.formFormation.reset({
      university_name: this.dataFormation?.university_name,
      professional_area: this.dataFormation?.professional_area,
      status: this.dataFormation?.status,
      start_date: this.dataFormation?.start_date,
      finish_date: this.dataFormation?.finish_date
    });
  }

  createFormation() {
    this.formFormation = this.formBuilder.group({
      university_name: ['', [Validators.required, Validators.minLength(5)]],
      professional_area: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      finish_date: ['']
    });
  }

  save(){
    console.log(this.formFormation);
    const formation: formationModel = this.formFormation.value;

    if(this.formFormation.invalid) {
      this.formFormation.markAllAsTouched();
      return;
    }

    if(this.dataFormation && this.dataFormation.id != 0) {
      this.formationService.updateFormation(this.idProfile, this.dataFormation.id, formation).subscribe((res: any) => {
        console.log(res);
        this.resAlert = res.message;
        this.dataFormation.id = null;
        this.loadingFormations.emit();
        this.notification.emit(this.resAlert);
        this.closeModal.close('modalFormacion');
      });
      console.log('REGISTRO ACTUALIZADO');
    } else {
      this.formationService.saveFormation(this.idProfile, formation).subscribe((res: any) => {
        console.log(res);
        this.resAlert = res.message;
        this.loadingFormations.emit();
        this.notification.emit(this.resAlert);
        this.closeModal.close('modalFormacion');
      });
      console.log('REGISTRO GUaRDADO');
    }

  }

}
