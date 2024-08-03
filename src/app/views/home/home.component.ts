import { Component, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  @ViewChild(ConfirmationComponent) modalClose!: ConfirmationComponent;

  public profiles: profileModel[];
  public profile!: profileModel;
  public modalName: string;
  public modalType: string;
  
  idPerfil:number = 0;

  constructor(private router: Router,
    private profileService: ProfileService
  ) {
    this.profiles = [];
    this.modalName = '';
    this.modalType = '';

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
    this.profileService.deleteProfile(id).subscribe( (data: any) => {
      console.log(data);
      this.viewProfiles();
      this.modalClose.closeModal();
    });
    console.log('EL PERFIL ELIMINADO FUE:', id);
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

}
