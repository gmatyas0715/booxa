import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyDataComponent as EsemenyDataComponent } from './esemeny-data.component';

describe('HelyszinDataComponent', () => {
  let component: EsemenyDataComponent;
  let fixture: ComponentFixture<EsemenyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsemenyDataComponent]
    });
    fixture = TestBed.createComponent(EsemenyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
