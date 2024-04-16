import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent implements OnChanges {
  @Input() dateProfile: any;
  formProfile!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private profileService: ProfileService) {
    this.createProfile();
  }

  ngOnChanges(): void {
    this.getProfile();
  }

  campoNoValido(campo: string) {
    return this.formProfile.get(campo)?.invalid && this.formProfile.get(campo)?.touched;
  }

  createProfile() {
    this.formProfile = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  getProfile() {
    if(this.dateProfile){
      this.formProfile.reset({
        title: this.dateProfile.title,
        description: this.dateProfile.description
      })
    }
  }

  guardar(){
    const formData: profileModel = this.formProfile.value;
    console.log(this.formProfile);
    if( this.formProfile.invalid) {
      return this.formProfile.markAllAsTouched();
    }

    if(this.dateProfile && this.dateProfile.id) {
      console.log('Ahora toca actualizar');
      this.profileService.updateProfile(this.dateProfile.id, formData).subscribe(( res: any) => {
        console.log('UPDATE EJECUTADO: ',res);
      });
    } else {
      this.profileService.createProfile(formData).subscribe((res: any) => {
        console.log(res);
        console.log('DEBERIA DE GUARDAR:')
      });
    }
    
  }
}
