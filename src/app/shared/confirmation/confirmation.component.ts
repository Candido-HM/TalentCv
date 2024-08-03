import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var bootstrap: any; // Asegúrate de declarar bootstrap

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent {
  @Input() titleModal: any;
  @Input() action!: string;
  @Output() confirmation = new EventEmitter();

  constructor() {}

  confirmationDelete() {
    this.confirmation.emit(this.action);
    // console.log('DIJO QUE SI ):', this.action);
  }

  closeModal() {
    const modalElement = document.getElementById('modalValidation');
    if (modalElement) {
      // Obtener la instancia del modal usando Bootstrap
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); // Cierra el modal
      }
    }
  }
}
