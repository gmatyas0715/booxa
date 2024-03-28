import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SikeresFizetesComponent } from './sikeres-fizetes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserAzonositasService } from 'src/app/_auth/user-azonositas.service';
import { RendelesService } from 'src/app/_szervizek/rendeles.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('SikeresFizetesComponent', () => {
  let component: SikeresFizetesComponent;
  let fixture: ComponentFixture<SikeresFizetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatProgressSpinnerModule],
      declarations: [SikeresFizetesComponent],
      providers:[RendelesService,HttpClient,UserAzonositasService,{
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                queryParamMap: {
                    get(): string {
                        return '1';
                    },
                },
            },
        },
    }]
    });
    fixture = TestBed.createComponent(SikeresFizetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
