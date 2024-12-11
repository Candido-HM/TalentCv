import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './aside/aside.component';
import { ModeToggleModule } from '../components/mode-toggle/mode-toggle.module';


@NgModule({
  declarations: [
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModeToggleModule
  ],
  exports: [
    AsideComponent
  ]
})
export class SharedModule { }
