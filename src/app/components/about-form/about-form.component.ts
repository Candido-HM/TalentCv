import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UbicationService } from 'src/app/services/ubication.service';
import { UbicationFormComponent } from '../ubication-form/ubication-form.component';


@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.sass']
})
export class AboutFormComponent implements OnChanges {
  @ViewChild(UbicationFormComponent) ubicationForm!: UbicationFormComponent;
  @Input() dateUser: any;
  @Input() dataUbication: any;
  @Output() loadingUser = new EventEmitter();
  @Output() loadingUbication = new EventEmitter();
  countries!: any[];
  states!: any[];

  formAbout!: FormGroup;

  constructor( private formBuider: FormBuilder,
                private userService: UserService,
                private ubicationService: UbicationService) {
    this.createAbout();

    // this.viewCountries();
    // this.viewStates();
  }

  ngOnChanges(): void {
    this.getUser();
  }

  campoNoValido(campo: string) {
    return this.formAbout.get(campo)?.invalid && this.formAbout.get(campo)?.touched;
  }

  createAbout() {
    this.formAbout = this.formBuider.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  getUser() {
    if(this.dateUser){
      this.formAbout.reset({
        name: this.dateUser.name,
        last_name: this.dateUser.last_name,
        city: this.dateUser.city,
        country: this.dateUser.country 
      });
    } 
  }

  guardar() {
    // console.log(this.formAbout);
    const formUser: userModel = this.formAbout.value;
    const idUser = this.dateUser.id;
    const verifyUbication = this.ubicationForm.viewResult();

    if( this.formAbout.invalid) {
      return this.formAbout.markAllAsTouched();
    }

    this.userService.updateUser(idUser, formUser).subscribe((res: any) => {
      // console.log(res);
      this.loadingUser.emit();
    });
    console.log(this.dataUbication);

    if (this.dataUbication.id != undefined ) {
      this.ubicationService.updateUbication( this.dataUbication.id, verifyUbication).subscribe((res: any) => {
        // console.log('ACTUALIZADO ALO SIGUIENTE: ', res);
        this.loadingUbication.emit();
      });
      console.log('UBICACION ACTUALIZAR....');
    } else {
      this.ubicationService.saveUbication( verifyUbication ).subscribe((res: any) => {
        // console.log('UBICACION A GUARDADO', res);
        this.loadingUbication.emit();
      });
    }
  }

}
