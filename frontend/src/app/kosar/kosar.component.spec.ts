import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosarComponent } from './kosar.component';
import { HttpClientModule } from '@angular/common/http';
import { KosarService } from '../_szervizek/kosar.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { EloadoService } from '../_szervizek/eloado.service';

describe('KosarComponent', () => {
  let component: KosarComponent;
  let fixture: ComponentFixture<KosarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [KosarComponent],
      providers:[KosarService,HelyszinService,EloadoService]
    });
    fixture = TestBed.createComponent(KosarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
