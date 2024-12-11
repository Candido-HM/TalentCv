import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { AboutFormComponent } from './about-form/about-form.component';
import { ExperienciaFormComponent } from './experiencia-form/experiencia-form.component';
import { FormacionFormComponent } from './formacion-form/formacion-form.component';
import { ModeToggleModule } from './mode-toggle/mode-toggle.module';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { UbicationFormComponent } from './ubication-form/ubication-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateComponent } from './skill/create/create.component';
import { UpdateComponent } from './skill/update/update.component';

@NgModule({
  declarations: [
    AboutFormComponent,
    ExperienciaFormComponent,
    FormacionFormComponent,
    ProfileFormComponent,
    ProjectFormComponent,
    CourseFormComponent,
    UbicationFormComponent,
    ContactFormComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    ModeToggleModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
  ],
  exports: [
    AboutFormComponent,
    ProfileFormComponent,
    ExperienciaFormComponent,
    ProjectFormComponent,
    FormacionFormComponent,
    CourseFormComponent,
    // RegisterComponent,
    // LoginComponent,
    ContactFormComponent,
    CreateComponent,
    UpdateComponent,
    ModeToggleModule
  ]
})
export class FormModule { }
