import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';

//Nueva estrutura para el proyecto
import { LandingModule } from './landing/landing.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
// import { SelectDropDownModule } from 'ngx-select-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { WelcomeComponent } from './views/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    FormacionComponent,
    ExperienciaComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    AuthModule,
    UserModule,
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
