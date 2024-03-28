import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisztracioComponent } from './regisztracio.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisztracioComponent', () => {
  let component: RegisztracioComponent;
  let fixture: ComponentFixture<RegisztracioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatCardModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule],
      declarations: [RegisztracioComponent],
      providers:[FormBuilder,UserService,UserAzonositasService,Router,DatePipe,MatSnackBar]
    });
    fixture = TestBed.createComponent(RegisztracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
