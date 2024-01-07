import { TestBed } from '@angular/core/testing';

import { SzektorService } from './szektor.service';

describe('SzektorCsoportService', () => {
  let service: SzektorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzektorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
