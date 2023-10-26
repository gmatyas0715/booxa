import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalMenusavComponent } from './felso-menusav.component';

describe('BalMenusavComponent', () => {
  let component: BalMenusavComponent;
  let fixture: ComponentFixture<BalMenusavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalMenusavComponent]
    });
    fixture = TestBed.createComponent(BalMenusavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
