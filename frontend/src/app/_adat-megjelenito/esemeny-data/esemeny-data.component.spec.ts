import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyDataComponent as EsemenyDataComponent } from './esemeny-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { EsemenyService } from 'src/app/_szervizek/esemeny.service';

describe('HelyszinDataComponent', () => {
  let component: EsemenyDataComponent;
  let fixture: ComponentFixture<EsemenyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [EsemenyDataComponent],
      providers: [EsemenyService,UserAzonositasService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(EsemenyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
