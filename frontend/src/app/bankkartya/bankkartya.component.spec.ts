import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankkartyaComponent } from './bankkartya.component';

describe('BankkartyaComponent', () => {
  let component: BankkartyaComponent;
  let fixture: ComponentFixture<BankkartyaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankkartyaComponent]
    });
    fixture = TestBed.createComponent(BankkartyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
