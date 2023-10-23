import { TestBed } from '@angular/core/testing';

import { HelyszinService } from './helyszin.service';

describe('HelyszinService', () => {
  let service: HelyszinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelyszinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
