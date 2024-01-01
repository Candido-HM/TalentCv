import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from './components/form.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { FormacionComponent } from './views/formacion/formacion.component';
import { ExperienciaComponent } from './views/experiencia/experiencia.component';
import { AsideComponent } from './shared/aside/aside.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FormacionComponent,
    ExperienciaComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
