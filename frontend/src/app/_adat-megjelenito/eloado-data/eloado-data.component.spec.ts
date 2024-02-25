import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EloadoDataComponent as EloadoDataComponent } from './eloado-data.component';

describe('EloadoDataComponent', () => {
  let component: EloadoDataComponent;
  let fixture: ComponentFixture<EloadoDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EloadoDataComponent]
    });
    fixture = TestBed.createComponent(EloadoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
