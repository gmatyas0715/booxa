import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimDataComponent as CimDataComponent } from './cim-data.component';
import { CimService } from 'src/app/_szervizek/cim.service';
import { UserService } from 'src/app/_szervizek/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CimDataComponent', () => {
  let component: CimDataComponent;
  let fixture: ComponentFixture<CimDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatPaginatorModule, MatTableModule],
      declarations: [CimDataComponent],
      providers: [CimService, UserService,provideAnimations() ]
    });
    fixture = TestBed.createComponent(CimDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
