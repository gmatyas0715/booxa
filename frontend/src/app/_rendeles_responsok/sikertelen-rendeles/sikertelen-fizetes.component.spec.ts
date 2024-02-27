import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SikertelenFizetesComponent } from './sikertelen-fizetes.component';

describe('SikertelenRendelesComponent', () => {
  let component: SikertelenFizetesComponent;
  let fixture: ComponentFixture<SikertelenFizetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SikertelenFizetesComponent]
    });
    fixture = TestBed.createComponent(SikertelenFizetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
