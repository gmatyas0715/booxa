import { TestBed } from '@angular/core/testing';

import { SzallitasService } from './szallitas.service';

describe('SzallitasService', () => {
  let service: SzallitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzallitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
