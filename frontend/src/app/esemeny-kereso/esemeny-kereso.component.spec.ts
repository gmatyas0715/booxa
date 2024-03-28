import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyKeresoComponent } from './esemeny-kereso.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CimService } from '../_szervizek/cim.service';
import { EloadoService } from '../_szervizek/eloado.service';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { KosarService } from '../_szervizek/kosar.service';
import { MufajService } from '../_szervizek/mufaj.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('EsemenyKeresoComponent', () => {
  let component: EsemenyKeresoComponent;
  let fixture: ComponentFixture<EsemenyKeresoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,MatIconModule,MatCardModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule,MatSliderModule,MatAutocompleteModule,MatGridListModule,FormsModule,BrowserAnimationsModule,MatInputModule],
      declarations: [EsemenyKeresoComponent],
      providers: [EsemenyService,EloadoService,HelyszinService,MufajService,CimService,KosarService,DatePipe,BreakpointObserver,{
        provide: ActivatedRoute,
        useValue: {
          queryParams:
            of({ eloado: 'exampleEloado', 
                  helyszin: 'exampleHelyszin' })
        },
      }]
    });
    fixture = TestBed.createComponent(EsemenyKeresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
