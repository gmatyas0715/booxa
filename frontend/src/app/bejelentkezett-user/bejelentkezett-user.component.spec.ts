import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezettUserComponent } from './bejelentkezett-user.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { UserService } from '../_szervizek/user.service';
import { MatIconModule } from '@angular/material/icon';

describe('BejelentkezettUserComponent', () => {
  let component: BejelentkezettUserComponent;
  let fixture: ComponentFixture<BejelentkezettUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatIconModule],
      declarations: [BejelentkezettUserComponent],
      providers:[UserAzonositasService,UserService,Router,MatSnackBar]
    });
    fixture = TestBed.createComponent(BejelentkezettUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
