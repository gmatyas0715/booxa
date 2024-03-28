import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzamlazasiAdatokComponent } from './szamlazasi-adatok.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { KosarService } from '../_szervizek/kosar.service';
import { RendelesService } from '../_szervizek/rendeles.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SzamlazasiAdatokComponent', () => {
  let component: SzamlazasiAdatokComponent;
  let fixture: ComponentFixture<SzamlazasiAdatokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule],
      declarations: [SzamlazasiAdatokComponent],
      providers:[UserAzonositasService,KosarService,RendelesService,Router,FormBuilder]
    });
    fixture = TestBed.createComponent(SzamlazasiAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
