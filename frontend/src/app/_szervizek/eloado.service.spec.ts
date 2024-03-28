import { TestBed } from '@angular/core/testing';

import { EloadoService } from './eloado.service';
import { HttpClientModule } from '@angular/common/http';

describe('EloadoService', () => {
  let service: EloadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(EloadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
