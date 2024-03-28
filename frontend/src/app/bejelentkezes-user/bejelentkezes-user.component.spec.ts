import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezesUserComponent } from './bejelentkezes-user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BejelentkezesUserComponent', () => {
  let component: BejelentkezesUserComponent;
  let fixture: ComponentFixture<BejelentkezesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatCardModule,MatFormFieldModule,FormsModule,MatInputModule,BrowserAnimationsModule],
      declarations: [BejelentkezesUserComponent],
      providers:[UserAzonositasService,UserService]
    });
    fixture = TestBed.createComponent(BejelentkezesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
