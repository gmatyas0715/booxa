import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KezdooldalComponent } from './kezdooldal.component';
import { HttpClientModule } from '@angular/common/http';
import { EloadoService } from '../_szervizek/eloado.service';
import { MatCardModule } from '@angular/material/card';

describe('KezdooldalComponent', () => {
  let component: KezdooldalComponent;
  let fixture: ComponentFixture<KezdooldalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule],
      declarations: [ KezdooldalComponent ],
      providers: [EloadoService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KezdooldalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
