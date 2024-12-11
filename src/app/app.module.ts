import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from './components/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

//Nueva estrutura para el proyecto
import { LandingModule } from './landing/landing.module';
import { AuthModule } from './auth/auth.module';
// import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
// import { SelectDropDownModule } from 'ngx-select-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { ProfileComponent } from './views/profile/profile.component';
// import { LandingPagesComponent } from './shared/landing-pages/landing-pages.component';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { AlertsComponent } from './shared/alerts/alerts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FormacionComponent,
    ExperienciaComponent,
    WelcomeComponent,
    ProfileComponent,
    ConfirmationComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    AuthModule,
    // SharedModule,
    UserModule,
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
