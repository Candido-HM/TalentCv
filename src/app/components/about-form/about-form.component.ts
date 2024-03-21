import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.sass']
})
export class AboutFormComponent {

  formAbout!: FormGroup;

  constructor( private formBuider: FormBuilder) {
    this.createAbout();
  }

  campoNoValido(campo: string) {
    return this.formAbout.get(campo)?.invalid && this.formAbout.get(campo)?.touched;
  }

  createAbout() {
    this.formAbout = this.formBuider.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      perfil: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['']
    });
  }

  guardar() {
    console.log(this.formAbout);
    if( this.formAbout.invalid) {
      return this.formAbout.markAllAsTouched();
    }
  }
}
