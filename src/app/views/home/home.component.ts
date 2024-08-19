import { Component, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { AlertsComponent } from 'src/app/shared/alerts/alerts.component';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild(ConfirmationComponent) modalClose!: ConfirmationComponent;
  @ViewChild(AlertsComponent) showNotification!: AlertsComponent;

  public profiles: profileModel[];
  public profile!: profileModel;
  public modalName: string;
  public modalType: string;
  
  idPerfil:number = 0;
  resNotification: string;
  templates: any;

  constructor(private router: Router,
    private profileService: ProfileService,
    private pdfService: TemplatePdfService,
    private closeModal: CloseModalService
  ) {
    this.profiles = [];
    this.modalName = '';
    this.modalType = '';
    this.resNotification = '';

    this.viewProfiles();
    this.listTemplates();
  }

  viewProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data.data;
    })
  }

  redirect(name: string, id: number) {
    // console.log(name);
    this.pdfService.setTemplateId(id);
    this.closeModal.close(name);
    setTimeout(() => {
      this.router.navigate(['profile/new']);
    }, 500)
  }

  viewProfile(id: number){
    this.profileService.getProfile(id).subscribe((profile: profileModel) => {
        this.profile = profile;
        this.router.navigate(['profile/', id]);
    });
  }

  deleteProfile(id: number){
    this.profileService.deleteProfile(id).subscribe( (res: any) => {
      console.log(res);
      this.resNotification = res.message;
      this.viewProfiles();
      this.modalClose.closeModal();
      this.notificationAlert();
    });
    console.log('EL PERFIL ELIMINADO FUE:', this.resNotification);
  }

  confirmationExperience(id: number, title: string){
    this.modalType = 'perfil';
    this.modalName = title;
    this.idPerfil = id;
  }

  validationConfirmation(action: string) {
    console.log('ACTION:',action)
    if ( action === 'perfil') {
      this.deleteProfile(this.idPerfil);
    } 
  }

  notificationAlert() {
    console.log('RECIBI EL EVENTO DEL FORMULARIO: ', this.resNotification);
    this.showNotification.show();
  }


  listTemplates() {
    this.pdfService.getTemplates().subscribe( (resp: any) => {
    this.templates = resp.data;
     console.log(resp);
    }) 
   }

}
