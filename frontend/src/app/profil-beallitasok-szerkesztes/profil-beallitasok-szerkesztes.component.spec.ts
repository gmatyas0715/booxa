import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBeallitasokSzerkesztesComponent } from './profil-beallitasok-szerkesztes.component';

describe('ProfilBeallitasokSzerkesztesComponent', () => {
  let component: ProfilBeallitasokSzerkesztesComponent;
  let fixture: ComponentFixture<ProfilBeallitasokSzerkesztesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilBeallitasokSzerkesztesComponent]
    });
    fixture = TestBed.createComponent(ProfilBeallitasokSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
