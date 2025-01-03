import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.sass']
})

export class ProfileFormComponent implements OnInit, OnChanges {
  @Input() dateProfile: any;
  @Output() loadingProfile = new EventEmitter<number>();
  @Output() notification = new EventEmitter<string>();

  formProfile!: FormGroup;
  template_id: number;
  resAlert: string;

  constructor( private formBuilder: FormBuilder,
                private profileService: ProfileService,
                private pdfService: TemplatePdfService,
                private closeModal: CloseModalService) {
    this.resAlert = '';
    this.template_id = 0;
  }

  ngOnInit(): void {
    this.template_id = this.pdfService.gettemplateId(); 
    // console.log('TEMPLATE ID:', this.template_id);
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
      description: ['', [Validators.required, Validators.minLength(5)]],
      template_id: [this.template_id]
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
    console.log(formData);
    if( this.formProfile.invalid) {
      return this.formProfile.markAllAsTouched();
    }

    if(this.dateProfile && this.dateProfile.id) {
      this.profileService.updateProfile(this.dateProfile.id, formData).subscribe(( res: any) => {
        this.resAlert = res.message;
        this.loadingProfile.emit(this.dateProfile.id);
        this.notification.emit(this.resAlert);
        this.closeModal.close('modalProfile');
        console.log('DESDE EL SERVE DIGO: ', this.resAlert);
      });
    } else {
      this.profileService.createProfile(formData).subscribe((res: any) => {
        // console.log('DEBERIA DE GUARDAR:', res.data);
        this.resAlert = res.message;
        this.dateProfile = res.data.id;
        this.loadingProfile.emit(this.dateProfile);
        this.notification.emit(this.resAlert);
        this.closeModal.close('modalProfile');
      });
    }
  }

}
