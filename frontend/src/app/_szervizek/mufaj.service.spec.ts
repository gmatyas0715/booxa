import { TestBed } from '@angular/core/testing';

import { MufajService } from './mufaj.service';

describe('MufajService', () => {
  let service: MufajService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MufajService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
