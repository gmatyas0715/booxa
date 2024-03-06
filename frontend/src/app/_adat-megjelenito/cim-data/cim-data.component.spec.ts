import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimDataComponent as CimDataComponent } from './cim-data.component';

describe('CimDataComponent', () => {
  let component: CimDataComponent;
  let fixture: ComponentFixture<CimDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CimDataComponent]
    });
    fixture = TestBed.createComponent(CimDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
