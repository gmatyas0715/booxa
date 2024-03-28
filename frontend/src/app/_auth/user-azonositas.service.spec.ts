import { TestBed } from '@angular/core/testing';

import { UserAzonositasService } from './user-azonositas.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserAzonositasService', () => {
  let service: UserAzonositasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(UserAzonositasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
