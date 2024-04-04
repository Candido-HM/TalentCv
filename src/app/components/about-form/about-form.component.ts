import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { userModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.sass']
})
export class AboutFormComponent implements OnChanges {
  @Input() dateUser: any;
  formAbout!: FormGroup;

  constructor( private formBuider: FormBuilder) {
    this.createAbout();
  }

  ngOnChanges(): void {
    this.getUser();
  }

  campoNoValido(campo: string) {
    return this.formAbout.get(campo)?.invalid && this.formAbout.get(campo)?.touched;
  }

  createAbout() {
    this.formAbout = this.formBuider.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: [''],
      pais: ['']
    });
  }

  getUser() {
    if(this.dateUser){
      this.formAbout.reset({
        nombre: this.dateUser.name,
        apellido: this.dateUser.last_name,
        ciudad: this.dateUser.city,
        pais: this.dateUser.country 
      })
    } 
  }

  guardar() {
    console.log(this.formAbout);
    if( this.formAbout.invalid) {
      return this.formAbout.markAllAsTouched();
    }
  }
}
