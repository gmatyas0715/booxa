import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MufajDataComponent as MufajDataComponent } from './mufaj-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { MufajService } from 'src/app/_szervizek/mufaj.service';

describe('MufajDataComponent', () => {
  let component: MufajDataComponent;
  let fixture: ComponentFixture<MufajDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [MufajDataComponent],
      providers: [MufajService,UserAzonositasService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(MufajDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
