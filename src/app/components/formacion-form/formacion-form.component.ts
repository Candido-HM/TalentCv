import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormationService } from 'src/app/services/formation.service';
import { formationModel } from 'src/app/models/formation.model';

@Component({
  selector: 'app-formacion-form',
  templateUrl: './formacion-form.component.html',
  styleUrls: ['./formacion-form.component.sass']
})
export class FormacionFormComponent implements OnChanges {
  @Input() dataFormation: any;

  formFormation!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private formationService: FormationService) {
    this.createFormation();
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
    }

    if(this.dataFormation && this.dataFormation.id) {
      this.formationService.updateFormation(this.dataFormation.id, formation).subscribe((res: any) => {
        console.log(res)
      });
      console.log('REGISTRO ACTUALIZADO');
    } else {
      this.formationService.saveFormation(formation).subscribe((res: any) => {
        console.log(res);
      });
      console.log('REGISTRO GUaRDADO');
    }

  }

}
