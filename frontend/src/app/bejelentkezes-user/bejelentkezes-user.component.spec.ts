import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezesUserComponent } from './bejelentkezes-user.component';

describe('BejelentkezesUserComponent', () => {
  let component: BejelentkezesUserComponent;
  let fixture: ComponentFixture<BejelentkezesUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BejelentkezesUserComponent]
    });
    fixture = TestBed.createComponent(BejelentkezesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
