import { TestBed } from '@angular/core/testing';

import { ApiCountryService } from './api-country.service';

describe('ApiCountryService', () => {
  let service: ApiCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
