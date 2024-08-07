import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollProgressBarComponent } from './scroll-progress-bar.component';

describe('ScrollProgressBarComponent', () => {
  let component: ScrollProgressBarComponent;
  let fixture: ComponentFixture<ScrollProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollProgressBarComponent]
    });
    fixture = TestBed.createComponent(ScrollProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
