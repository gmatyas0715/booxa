import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzamlazasiAdatokComponent } from './szamlazasi-adatok.component';

describe('SzamlazasiAdatokComponent', () => {
  let component: SzamlazasiAdatokComponent;
  let fixture: ComponentFixture<SzamlazasiAdatokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzamlazasiAdatokComponent]
    });
    fixture = TestBed.createComponent(SzamlazasiAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
