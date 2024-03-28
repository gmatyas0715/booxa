import { TestBed } from '@angular/core/testing';

import { EsemenyService } from './esemeny.service';
import { HttpClientModule } from '@angular/common/http';

describe('EsemenyService', () => {
  let service: EsemenyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(EsemenyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
