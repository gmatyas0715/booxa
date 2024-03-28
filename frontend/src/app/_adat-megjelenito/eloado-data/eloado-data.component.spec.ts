import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EloadoDataComponent as EloadoDataComponent } from './eloado-data.component';
import { MufajService } from 'src/app/_szervizek/mufaj.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { EloadoService } from 'src/app/_szervizek/eloado.service';

describe('EloadoDataComponent', () => {
  let component: EloadoDataComponent;
  let fixture: ComponentFixture<EloadoDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [EloadoDataComponent],
      providers: [EloadoService,MufajService,UserAzonositasService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(EloadoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
