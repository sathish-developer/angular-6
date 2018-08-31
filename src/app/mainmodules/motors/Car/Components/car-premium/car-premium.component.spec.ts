import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPremiumComponent } from './car-premium.component';

describe('CarPremiumComponent', () => {
  let component: CarPremiumComponent;
  let fixture: ComponentFixture<CarPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
