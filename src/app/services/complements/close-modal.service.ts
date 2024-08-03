import { Injectable } from '@angular/core';

declare var bootstrap: any; // Asegúrate de declarar bootstrap

@Injectable({
  providedIn: 'root'
})
export class CloseModalService {

  constructor() { }

  close(nameModal: string) {
    const modalElement = document.getElementById(nameModal);
    if (modalElement) {
      // Obtener la instancia del modal usando Bootstrap
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); // Cierra el modal
      }
    }
  }
}
