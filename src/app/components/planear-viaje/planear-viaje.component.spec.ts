import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanearViajeComponent } from './planear-viaje.component';

describe('PlanearViajeComponent', () => {
  let component: PlanearViajeComponent;
  let fixture: ComponentFixture<PlanearViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanearViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanearViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
