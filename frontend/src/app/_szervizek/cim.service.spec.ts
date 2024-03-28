import { TestBed } from '@angular/core/testing';

import { CimService } from './cim.service';
import { HttpClientModule } from '@angular/common/http';

describe('CimService', () => {
  let service: CimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(CimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
