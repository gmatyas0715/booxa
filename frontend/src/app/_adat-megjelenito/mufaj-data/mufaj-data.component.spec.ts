import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MufajDataComponent as MufajDataComponent } from './mufaj-data.component';

describe('MufajDataComponent', () => {
  let component: MufajDataComponent;
  let fixture: ComponentFixture<MufajDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MufajDataComponent]
    });
    fixture = TestBed.createComponent(MufajDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
