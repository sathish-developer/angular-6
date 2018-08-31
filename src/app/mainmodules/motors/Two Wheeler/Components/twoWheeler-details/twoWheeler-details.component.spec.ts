import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWheelerDetailsComponent } from './twoWheeler-details.component';

describe('TwoWheelerDetailsComponent', () => {
  let component: TwoWheelerDetailsComponent;
  let fixture: ComponentFixture<TwoWheelerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWheelerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWheelerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
