import { TestBed } from '@angular/core/testing';

import { MufajService } from './mufaj.service';
import { HttpClientModule } from '@angular/common/http';

describe('MufajService', () => {
  let service: MufajService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(MufajService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
