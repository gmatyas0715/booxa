import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosarKicsiComponent } from './kosar-kicsi.component';

describe('KosarKicsiComponent', () => {
  let component: KosarKicsiComponent;
  let fixture: ComponentFixture<KosarKicsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KosarKicsiComponent]
    });
    fixture = TestBed.createComponent(KosarKicsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
