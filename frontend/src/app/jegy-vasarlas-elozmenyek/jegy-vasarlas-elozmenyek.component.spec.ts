import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek.component';

describe('JegyVasarlasElozmenyekComponent', () => {
  let component: JegyVasarlasElozmenyekComponent;
  let fixture: ComponentFixture<JegyVasarlasElozmenyekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JegyVasarlasElozmenyekComponent]
    });
    fixture = TestBed.createComponent(JegyVasarlasElozmenyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
