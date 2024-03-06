import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelyszinDataComponent as HelyszinDataComponent } from './helyszin-data.component';

describe('HelyszinDataComponent', () => {
  let component: HelyszinDataComponent;
  let fixture: ComponentFixture<HelyszinDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelyszinDataComponent]
    });
    fixture = TestBed.createComponent(HelyszinDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
