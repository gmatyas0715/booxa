import { TestBed } from '@angular/core/testing';

import { FizetesService } from './fizetes.service';

describe('FizetesService', () => {
  let service: FizetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FizetesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
