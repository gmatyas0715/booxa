import { TestBed } from '@angular/core/testing';

import { UserAzonositasService } from './user-azonositas.service';

describe('UserAzonositasService', () => {
  let service: UserAzonositasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAzonositasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
