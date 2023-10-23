import { TestBed } from '@angular/core/testing';

import { EloadoService } from './eloado.service';

describe('EloadoService', () => {
  let service: EloadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EloadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
