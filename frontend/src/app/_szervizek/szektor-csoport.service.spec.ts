import { TestBed } from '@angular/core/testing';

import { SzektorCsoportService } from './szektor-csoport.service';

describe('SzektorCsoportService', () => {
  let service: SzektorCsoportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzektorCsoportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
