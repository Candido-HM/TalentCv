import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormModule } from '../components/form.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperiencieComponent } from './pages/experiencie/experiencie.component';
import { TrainingComponent } from './pages/training/training.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    AboutComponent,
    ExperiencieComponent,
    TrainingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule
  ],
  exports: [
    ProfileComponent,
    HomeComponent,
    AboutComponent,
    ExperiencieComponent,
    TrainingComponent
  ]
})
export class UserModule { }
