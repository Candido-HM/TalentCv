import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from './components/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { AsideComponent } from './shared/aside/aside.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LandingPagesComponent } from './shared/landing-pages/landing-pages.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FormacionComponent,
    ExperienciaComponent,
    AsideComponent,
    WelcomeComponent,
    ProfileComponent,
    LandingPagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
