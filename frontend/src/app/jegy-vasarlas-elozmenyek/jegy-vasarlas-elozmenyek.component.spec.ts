import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JegyVasarlasElozmenyekComponent } from './jegy-vasarlas-elozmenyek.component';
import { RendelesService } from '../_szervizek/rendeles.service';
import { HttpClientModule } from '@angular/common/http';

describe('JegyVasarlasElozmenyekComponent', () => {
  let component: JegyVasarlasElozmenyekComponent;
  let fixture: ComponentFixture<JegyVasarlasElozmenyekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [JegyVasarlasElozmenyekComponent],
      providers:[RendelesService]
    });
    fixture = TestBed.createComponent(JegyVasarlasElozmenyekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
