import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyReszletekComponent } from './esemeny-reszletek.component';

describe('EsemenyReszletekComponent', () => {
  let component: EsemenyReszletekComponent;
  let fixture: ComponentFixture<EsemenyReszletekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsemenyReszletekComponent]
    });
    fixture = TestBed.createComponent(EsemenyReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
