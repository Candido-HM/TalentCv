import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: ProfileComponent, canActivate: [authGuard], children: [
    {path: 'home', component: HomeComponent },
    {path: 'profile/:id', component: AboutComponent },
    // {path: 'about', component: AboutComponent},
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
