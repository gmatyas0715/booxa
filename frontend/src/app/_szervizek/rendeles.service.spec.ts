import { TestBed } from '@angular/core/testing';

import { RendelesService } from './rendeles.service';
import { HttpClientModule } from '@angular/common/http';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { KosarService } from './kosar.service';

describe('RendelesService', () => {
  let service: RendelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[UserAzonositasService,KosarService]
    });
    service = TestBed.inject(RendelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
