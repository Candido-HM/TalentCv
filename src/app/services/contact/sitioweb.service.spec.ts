import { TestBed } from '@angular/core/testing';

import { SitiowebService } from './sitioweb.service';

describe('SitiowebService', () => {
  let service: SitiowebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitiowebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
