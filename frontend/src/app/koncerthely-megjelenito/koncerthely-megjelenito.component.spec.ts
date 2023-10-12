import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoncerthelyMegjelenitoComponent } from './koncerthely-megjelenito.component';

describe('KoncerthelyMegjelenitoComponent', () => {
  let component: KoncerthelyMegjelenitoComponent;
  let fixture: ComponentFixture<KoncerthelyMegjelenitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KoncerthelyMegjelenitoComponent]
    });
    fixture = TestBed.createComponent(KoncerthelyMegjelenitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
