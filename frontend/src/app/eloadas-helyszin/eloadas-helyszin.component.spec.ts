import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EloadasHelyszinComponent } from './eloadas-helyszin.component';

describe('EloadasHelyszinComponent', () => {
  let component: EloadasHelyszinComponent;
  let fixture: ComponentFixture<EloadasHelyszinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EloadasHelyszinComponent]
    });
    fixture = TestBed.createComponent(EloadasHelyszinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
