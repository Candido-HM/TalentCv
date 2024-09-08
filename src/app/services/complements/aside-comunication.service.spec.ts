import { TestBed } from '@angular/core/testing';

import { AsideComunicationService } from './aside-comunication.service';

describe('AsideComunicationService', () => {
  let service: AsideComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsideComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
