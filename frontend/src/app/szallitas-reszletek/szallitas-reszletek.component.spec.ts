import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzallitasReszletekComponent } from './szallitas-reszletek.component';

describe('SzallitasReszletekComponent', () => {
  let component: SzallitasReszletekComponent;
  let fixture: ComponentFixture<SzallitasReszletekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzallitasReszletekComponent]
    });
    fixture = TestBed.createComponent(SzallitasReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
