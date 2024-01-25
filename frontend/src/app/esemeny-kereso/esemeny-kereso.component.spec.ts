import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyKeresoComponent } from './esemeny-kereso.component';

describe('KeresesComponent', () => {
  let component: EsemenyKeresoComponent;
  let fixture: ComponentFixture<EsemenyKeresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsemenyKeresoComponent]
    });
    fixture = TestBed.createComponent(EsemenyKeresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
