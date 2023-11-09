import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBeallitasokComponent } from './profil-beallitasok.component';

describe('ProfilBeallitasokComponent', () => {
  let component: ProfilBeallitasokComponent;
  let fixture: ComponentFixture<ProfilBeallitasokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilBeallitasokComponent]
    });
    fixture = TestBed.createComponent(ProfilBeallitasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
