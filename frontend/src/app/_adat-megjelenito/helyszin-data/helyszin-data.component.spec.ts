import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelyszinDataComponent as HelyszinDataComponent } from './helyszin-data.component';
import { HelyszinService } from 'src/app/_szervizek/helyszin.service';
import { CimService } from 'src/app/_szervizek/cim.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';

describe('HelyszinDataComponent', () => {
  let component: HelyszinDataComponent;
  let fixture: ComponentFixture<HelyszinDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [HelyszinDataComponent],
      providers: [HelyszinService,CimService,UserAzonositasService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(HelyszinDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
