import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { profileModel } from 'src/app/models/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  public profiles: profileModel[];
  public profile!: profileModel;

  constructor(private router: Router,
    private profileService: ProfileService
  ) {
    this.profiles = [];

    this.viewProfiles();
  }

  viewProfiles(){
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data.data;
    })
  }

  redirect() {
    this.router.navigate(['dashboard/profile/new']);
  }

  viewProfile(id: number){
    this.profileService.getProfile(id).subscribe((profile: profileModel) => {
        this.profile = profile;
        this.router.navigate(['dashboard/profile/', id]);
    });
  }

  deleteProfile(id: number){
    console.log('EL PERFIL A ELIMINAR ES:', id);
    this.profileService.deleteProfile(id).subscribe( (data: any) => {
      console.log(data);
      this.viewProfiles();
    })
  }

}
