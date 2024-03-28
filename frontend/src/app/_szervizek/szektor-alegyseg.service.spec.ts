import { TestBed } from '@angular/core/testing';

import { SzektorAlegysegService } from './szektor-alegyseg.service';
import { HttpClientModule } from '@angular/common/http';

describe('SzektorAlegysegService', () => {
  let service: SzektorAlegysegService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(SzektorAlegysegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
