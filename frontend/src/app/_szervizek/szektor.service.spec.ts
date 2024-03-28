import { TestBed } from '@angular/core/testing';

import { SzektorService } from './szektor.service';
import { HttpClientModule } from '@angular/common/http';

describe('SzektorService', () => {
  let service: SzektorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(SzektorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
