import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SikeresFizetesComponent } from './sikeres-fizetes.component';

describe('SikeresRendelesComponent', () => {
  let component: SikeresFizetesComponent;
  let fixture: ComponentFixture<SikeresFizetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SikeresFizetesComponent]
    });
    fixture = TestBed.createComponent(SikeresFizetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
