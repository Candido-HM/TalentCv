import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass']
})
export class AsideComponent implements OnInit {

  user!: userModel;
  constructor( private router: Router,
                private activateRoute: ActivatedRoute,
              private auth: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.viewUser();
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
    })
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
