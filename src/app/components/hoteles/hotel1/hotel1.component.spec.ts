import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hotel1Component } from './hotel1.component';

describe('Hotel1Component', () => {
  let component: Hotel1Component;
  let fixture: ComponentFixture<Hotel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hotel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hotel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
