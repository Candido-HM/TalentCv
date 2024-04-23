import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutFormComponent } from './about-form/about-form.component';
import { ExperienciaFormComponent } from './experiencia-form/experiencia-form.component';
import { FormacionFormComponent } from './formacion-form/formacion-form.component';
import { ModeToggleModule } from './mode-toggle/mode-toggle.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  declarations: [
    AboutFormComponent,
    ExperienciaFormComponent,
    FormacionFormComponent,
    ProfileFormComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ModeToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AboutFormComponent,
    ProfileFormComponent,
    ExperienciaFormComponent,
    ProjectFormComponent,
    FormacionFormComponent,
    ModeToggleModule
  ]
})
export class FormModule { }
