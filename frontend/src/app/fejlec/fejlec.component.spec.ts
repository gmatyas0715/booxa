import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FejlecComponent } from './fejlec.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAzonositasService } from '../_auth/user-azonositas.service';
import { KosarService } from '../_szervizek/kosar.service';
import { UserService } from '../_szervizek/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

describe('FejlecComponent', () => {
  let component: FejlecComponent;
  let fixture: ComponentFixture<FejlecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatIconModule,MatBadgeModule],
      declarations: [FejlecComponent],
      providers: [UserService,UserAzonositasService,KosarService,UserService]
    });
    fixture = TestBed.createComponent(FejlecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
