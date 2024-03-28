import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataComponent as UserDataComponent } from './user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { UserService } from 'src/app/_szervizek/user.service';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [UserDataComponent],
      providers: [UserService,UserAzonositasService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
