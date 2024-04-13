import { TestBed } from '@angular/core/testing';

import { KosarService } from './kosar.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('KosarService', () => {
  let service: KosarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[CookieService]
    });
    service = TestBed.inject(KosarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
