import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutletContext } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.sass']
})
export class AboutFormComponent implements OnChanges {
  @Input() dateUser: any;
  @Output() loadingUser = new EventEmitter();

  formAbout!: FormGroup;

  constructor( private formBuider: FormBuilder,
                private userService: UserService) {
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      city: [''],
      country: ['']
    });
  }

  getUser() {
    if(this.dateUser){
      this.formAbout.reset({
        name: this.dateUser.name,
        last_name: this.dateUser.last_name,
        city: this.dateUser.city,
        country: this.dateUser.country 
      })
    } 
  }

  guardar() {
    console.log(this.formAbout);
    const formUser: userModel = this.formAbout.value; 
    const idUser = this.dateUser.id;
    if( this.formAbout.invalid) {
      return this.formAbout.markAllAsTouched();
    }
    this.userService.updateUser(idUser, formUser).subscribe((res: any) => {
      console.log(res);
      this.loadingUser.emit();
    })
  }
}
