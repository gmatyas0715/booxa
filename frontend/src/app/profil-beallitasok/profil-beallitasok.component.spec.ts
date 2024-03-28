import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBeallitasokComponent } from './profil-beallitasok.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfilBeallitasokComponent', () => {
  let component: ProfilBeallitasokComponent;
  let fixture: ComponentFixture<ProfilBeallitasokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatDialogModule,MatSnackBarModule,MatCardModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,MatInputModule,BrowserAnimationsModule],
      declarations: [ProfilBeallitasokComponent],
      providers:[DatePipe]
    });
    fixture = TestBed.createComponent(ProfilBeallitasokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
