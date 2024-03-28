import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyReszletekComponent } from './esemeny-reszletek.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EsemenyService } from '../_szervizek/esemeny.service';
import { HelyszinService } from '../_szervizek/helyszin.service';
import { KosarService } from '../_szervizek/kosar.service';
import { SzektorAlegysegService } from '../_szervizek/szektor-alegyseg.service';
import { SzektorService } from '../_szervizek/szektor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('EsemenyReszletekComponent', () => {
  let component: EsemenyReszletekComponent;
  let fixture: ComponentFixture<EsemenyReszletekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientModule,MatIconModule,MatProgressSpinnerModule],
      declarations: [EsemenyReszletekComponent],
      providers: [EsemenyService,HelyszinService,SzektorService,SzektorAlegysegService,KosarService,MatSnackBar,Renderer2, DatePipe,BreakpointObserver,{
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): string {
                        return '1';
                    },
                },
            },
        },
    }]
    });
    fixture = TestBed.createComponent(EsemenyReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
