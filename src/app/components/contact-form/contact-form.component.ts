import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { SitiowebService } from 'src/app/services/contact/sitioweb.service';
import { LinkedinService } from 'src/app/services/contact/linkedin.service';
import { GithubService } from 'src/app/services/contact/github.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass']
})
export class ContactFormComponent implements OnChanges {
  @Output() loadingContact = new EventEmitter();
  @Output() notification = new EventEmitter<string>();
  @Input() dataContact: any;
  formContact!: FormGroup;
  resAlert: string;

  constructor( private formBuilder: FormBuilder,
              private sitioService: SitiowebService,
              private linkedinService: LinkedinService,
              private githubService: GithubService,
              private closeModal: CloseModalService
  ) {
    this.createContact();
    this.resAlert = 'Información almacenado';
  }

  ngOnChanges(): void {
    this.getContacto();
  }

  createContact() {
    this.formContact = this.formBuilder.group({
      telefono: this.formBuilder.group({
        phone_number: [null, Validators.pattern("[0-9 ]{12}")]
      }),
      sitioweb: this.formBuilder.group({
        url_links: ['']
      }),
      linkedin: this.formBuilder.group({
        url_linkedin: ['']
      }),
      github: this.formBuilder.group({
        url_github: ['']
      })
    })
  }

  getContacto() {
    this.formContact.reset({
      telefono: {
        phone_number: this.dataContact?.phone.phone_number
      },
      sitioweb: {
        url_links: this.dataContact?.link.url_links
      },
      linkedin: {
        url_linkedin: this.dataContact?.linkedin.url_linkedin
      },
      github: {
        url_github: this.dataContact?.github.url_github
      }
    });
  }

  save() {
    const contacto = this.formContact.value;
    console.log(contacto);
    //Petiones a realizar
    if(!contacto.telefono) {
      /** Guardar y actualizar el número de telefono */
      console.log('TELEFONO CELULAR: ',contacto.telefono.phone_number);
    }

    if(contacto.sitioweb.url_links) {
      /** Guardar y actualizar la url del Sitio Web o Portfolio **/
      let idWeb = this.dataContact.link.id;
      if (idWeb != null) {
        this.sitioService.updateSiteWeb(idWeb, contacto.sitioweb).subscribe( (res: any) => {});
      } else {
        this.sitioService.createSiteWeb(contacto.sitioweb).subscribe( (res: any) => {});
      }
    }

    if(contacto.linkedin.url_linkedin) {
      /** Guardar y actualizar la url del Linkedin **/
      let idLinkedin = this.dataContact.linkedin.id;
      if(idLinkedin != null) {
        this.linkedinService.updateLinkedin(idLinkedin, contacto.linkedin).subscribe( (res: any) => {});
      } else {
        this.linkedinService.createLinkedin(contacto.linkedin).subscribe( (res: any) => {});
      }
    }

    if(contacto.github.url_github) {
      /** Guardar y actualizar la url del perfil de Github **/
      let idGithub = this.dataContact.github.id;
      if(idGithub != null) {
        this.githubService.updateGithub(idGithub, contacto.github).subscribe( (res: any) => {});
      } else {
        this.githubService.createGithub(contacto.github).subscribe( (res: any) => {});
      }
    }

    this.loadingContact.emit();
    this.notification.emit(this.resAlert);
    this.closeModal.close('modalContact');
  }
}
