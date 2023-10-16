import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezettUserComponent } from './bejelentkezett-user.component';

describe('BejelentkezettUserComponent', () => {
  let component: BejelentkezettUserComponent;
  let fixture: ComponentFixture<BejelentkezettUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BejelentkezettUserComponent]
    });
    fixture = TestBed.createComponent(BejelentkezettUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
