import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModeToggleModule } from '../components/mode-toggle/mode-toggle.module';
import { AsideComponent } from './aside/aside.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AsideComponent,
    AlertsComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModeToggleModule
  ],
  exports: [
    AsideComponent,
    AlertsComponent,
    ConfirmationComponent
  ]
})
export class SharedModule { }
