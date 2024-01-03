import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutFormComponent } from './about-form/about-form.component';
import { ExperienciaFormComponent } from './experiencia-form/experiencia-form.component';
import { FormacionFormComponent } from './formacion-form/formacion-form.component';
import { ModeToggleModule } from './mode-toggle/mode-toggle.module';

@NgModule({
  declarations: [
    AboutFormComponent,
    ExperienciaFormComponent,
    FormacionFormComponent
  ],
  imports: [
    CommonModule,
    ModeToggleModule
  ],
  exports: [
    AboutFormComponent,
    ExperienciaFormComponent,
    FormacionFormComponent,
    ModeToggleModule
  ]
})
export class FormModule { }
