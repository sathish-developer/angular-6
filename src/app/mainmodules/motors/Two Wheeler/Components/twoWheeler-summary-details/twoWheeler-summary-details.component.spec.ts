import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSummaryDetailsComponent } from './twoWheeler-summary-details.component';

describe('CarSummaryDetailsComponent', () => {
  let component: CarSummaryDetailsComponent;
  let fixture: ComponentFixture<CarSummaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarSummaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
