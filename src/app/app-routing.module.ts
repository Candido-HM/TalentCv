import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPagesComponent } from './shared/landing-pages/landing-pages.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, children: [
    {path: '', component: LandingPagesComponent},
    {path: 'registrarse', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  ]}, 
  {path: '', component: ProfileComponent, canActivate: [authGuard], children: [
    {path: 'home', component: HomeComponent },
    {path: 'profile/:id', component: AboutComponent },
    {path: 'experiencia/:id', component: ExperienciaComponent},
    {path: 'formacion/:id', component: FormacionComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
  ]},
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
