import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass']
})
export class ContactFormComponent {

  formContact!: FormGroup;

  constructor( private formBuilder: FormBuilder) {

    this.createContact();

  }

  createContact() {
    this.formContact = this.formBuilder.group({
      phone_number: [null, Validators.pattern("[0-9 ]{12}")]
    })
  }

}
