import { TestBed } from '@angular/core/testing';

import { KedvezmenyService } from './kedvezmeny.service';

describe('KedvezmenyService', () => {
  let service: KedvezmenyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KedvezmenyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
