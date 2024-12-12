import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { WelcomeComponent } from './views/welcome/welcome.component';

//Nueva estructura del proyecto en rutas
import { JumbotronComponent } from './landing/components/jumbotron/jumbotron.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

import { ProfileComponent } from './user/pages/profile/profile.component';
import { HomeComponent } from './user/pages/home/home.component';
import { AboutComponent } from './user/pages/about/about.component';
import { ExperiencieComponent } from './user/pages/experiencie/experiencie.component';
import { TrainingComponent } from './user/pages/training/training.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent, children: [
    {path: '', component: JumbotronComponent},
    {path: 'registrarse', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
  ]}, 
  {path: '', component: ProfileComponent, canActivate: [authGuard], children: [
    {path: 'home', component: HomeComponent },
    {path: 'profile/:id', component: AboutComponent },
    {path: 'experiencia/:id', component: ExperiencieComponent},
    {path: 'formacion/:id', component: TrainingComponent},
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
