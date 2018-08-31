import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWheelerRegistrationComponent } from './twoWheeler-registration.component';

describe('TwoWheelerRegistrationComponent', () => {
  let component: TwoWheelerRegistrationComponent;
  let fixture: ComponentFixture<TwoWheelerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWheelerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWheelerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
