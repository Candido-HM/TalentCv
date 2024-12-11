import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { ModeToggleModule } from "../components/mode-toggle/mode-toggle.module";



@NgModule({
  declarations: [
    JumbotronComponent
  ],
  imports: [
    CommonModule,
    ModeToggleModule
],
  exports: [
    JumbotronComponent
  ]
})
export class LandingModule { }
