import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdatSzerkesztoComponent } from './adat-szerkeszto.component';

describe('AdatSzerkesztoComponent', () => {
  let component: AdatSzerkesztoComponent;
  let fixture: ComponentFixture<AdatSzerkesztoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdatSzerkesztoComponent]
    });
    fixture = TestBed.createComponent(AdatSzerkesztoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
