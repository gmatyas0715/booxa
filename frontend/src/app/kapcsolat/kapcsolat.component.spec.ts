import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapcsolatComponent } from './kapcsolat.component';
import { MatIconModule } from '@angular/material/icon';

describe('KapcsolatComponent', () => {
  let component: KapcsolatComponent;
  let fixture: ComponentFixture<KapcsolatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatIconModule],
      declarations: [KapcsolatComponent]
    });
    fixture = TestBed.createComponent(KapcsolatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
