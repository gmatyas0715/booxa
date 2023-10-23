import { TestBed } from '@angular/core/testing';

import { JegyAdatService } from './jegy-adat.service';

describe('JegyAdatService', () => {
  let service: JegyAdatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JegyAdatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
