import { TestBed } from '@angular/core/testing';

import { JegyvasarlasaimElozmenyekService } from './jegyvasarlasaim-elozmenyek.service';

describe('JegyvasarlasaimElozmenyekService', () => {
  let service: JegyvasarlasaimElozmenyekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JegyvasarlasaimElozmenyekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
