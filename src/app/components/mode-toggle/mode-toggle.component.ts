import { Component } from '@angular/core';
import { ModeToggleService } from './services/mode-toggle.service';

@Component({
  selector: 'app-mode-toggle',
  templateUrl: './mode-toggle.component.html',
  styleUrls: ['./mode-toggle.component.sass']
})
export class ModeToggleComponent {

  constructor(private modeToggleService: ModeToggleService) { }

  toggle() {
    this.modeToggleService.toggleMode();
  }
}
