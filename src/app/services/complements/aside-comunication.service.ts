import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsideComunicationService {

  private nameAside = new BehaviorSubject<string>('');

  name = this.nameAside.asObservable();

  constructor() { }

  updateName(newName: string) {
    this.nameAside.next(newName);
  }
}
