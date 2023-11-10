import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesReszletekComponent } from './fizetes-reszletek.component';

describe('SzallitasReszletekComponent', () => {
  let component: FizetesReszletekComponent;
  let fixture: ComponentFixture<FizetesReszletekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FizetesReszletekComponent]
    });
    fixture = TestBed.createComponent(FizetesReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
