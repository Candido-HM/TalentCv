import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})
export class ProfileFormComponent {
  formProfile!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private profileService: ProfileService) {
    this.createProfile();
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

  guardar(){
    const formData: profileModel = this.formProfile.value;
    console.log(this.formProfile);
    if( this.formProfile.invalid) {
      return this.formProfile.markAllAsTouched();
    }
    this.profileService.createProfile(formData).subscribe((res: any) => {
      console.log(res);
      
    })
  }
}
