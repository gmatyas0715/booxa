import { TestBed } from '@angular/core/testing';

import { HelyszinService } from './helyszin.service';
import { HttpClientModule } from '@angular/common/http';

describe('HelyszinService', () => {
  let service: HelyszinService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(HelyszinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
