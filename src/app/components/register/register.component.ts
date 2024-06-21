import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userRegisterModel } from 'src/app/models/registerUser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  formRegister!: FormGroup;

  constructor( private formBuilder: FormBuilder,
                private router: Router,
                private auth: AuthService) {
    this.createFormRegister();
  }

  invalidField( campo: string){
    return this.formRegister.get(campo)?.invalid && this.formRegister.get(campo)?.touched;
  }

  passwordConfirmationValido() {
    const pass1 = this.formRegister.get('password')?.value;
    const pass2 = this.formRegister.get('password_confirmation')?.value;

    return (pass1 === pass2) ? false : true;
  }

  createFormRegister(){
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    })
  }

  create(){
    console.log(this.formRegister);
    const formData: userRegisterModel = this.formRegister.value;

    if(this.formRegister.invalid) {
      return this.formRegister.markAllAsTouched();
    }
    this.auth.create(formData).subscribe((res: any) => {
      console.log(res);
      this.auth.saveToken(res.access_token);
      this.router.navigate(['dashboard']);
    })
  }

}
