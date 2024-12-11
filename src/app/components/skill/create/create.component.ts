import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {

  idProfile: number;
  formSkill!: FormGroup;

  constructor (private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private skillService: SkillService
  ) {
    this.idProfile = 0;
    this.createSkill();

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
    })
  }

  campoNoValido(campo: string){
    return this.formSkill.get(campo)?.invalid && this.formSkill.get(campo)?.touched;
  }

  createSkill(){
    this.formSkill = this.formBuilder.group({
      talents: ['', [Validators.required]]
    })
  }

  save(){
    const skill = this.formSkill.value;
    if(this.formSkill.invalid) {
      this.formSkill.markAllAsTouched();
      return;
    }

    this.skillService.saveSkill(this.idProfile, skill).subscribe( (res: any) => {
      console.log(res);
    })

    // console.log('Soy la función SAVE + id:', this.idProfile);
    // console.log(this.formSkill);
  }

}
