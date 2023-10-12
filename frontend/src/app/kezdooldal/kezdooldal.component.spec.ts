import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KezdooldalComponent } from './kezdooldal.component';

describe('KezdooldalComponent', () => {
  let component: KezdooldalComponent;
  let fixture: ComponentFixture<KezdooldalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KezdooldalComponent]
    });
    fixture = TestBed.createComponent(KezdooldalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
