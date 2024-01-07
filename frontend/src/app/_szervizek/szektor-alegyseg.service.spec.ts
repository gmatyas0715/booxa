import { TestBed } from '@angular/core/testing';

import { SzektorAlegysegService } from './szektor-alegyseg.service';

describe('SzektorService', () => {
  let service: SzektorAlegysegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzektorAlegysegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
