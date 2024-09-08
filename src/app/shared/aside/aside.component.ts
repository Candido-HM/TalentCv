import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { AsideComunicationService } from 'src/app/services/complements/aside-comunication.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent implements OnInit {

  user!: userModel;
  userName: string = '';
  constructor( private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private asideName: AsideComunicationService) { }

  ngOnInit(): void {
    this.viewUser();
    this.asideName.name.subscribe((name: string) => {
      this.userName = name;
      console.log('ASIDE::->',this.userName);
    });
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
      this.userName = this.user.name+' '+this.user.last_name;
      // console.log('USER::--->', this.user);
    });
  }

  updateName(name: string){
    console.log(name);
  }


  salir() {
    this.auth.logout().subscribe({
      next: () => {
        localStorage.removeItem('user_token');
        this.router.navigateByUrl('/');
      }
    });
  }
}
