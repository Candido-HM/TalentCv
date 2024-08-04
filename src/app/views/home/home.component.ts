import { Component, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { AlertsComponent } from 'src/app/shared/alerts/alerts.component';

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

  constructor(private router: Router,
    private profileService: ProfileService
  ) {
    this.profiles = [];
    this.modalName = '';
    this.modalType = '';
    this.resNotification = '';

    this.viewProfiles();
  }

  viewProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data.data;
    })
  }

  redirect() {
    this.router.navigate(['profile/new']);
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

}
