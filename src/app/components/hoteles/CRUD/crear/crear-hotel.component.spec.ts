import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHotelComponent } from './crear-hotel.component';

describe('CrearHotelComponent', () => {
  let component: CrearHotelComponent;
  let fixture: ComponentFixture<CrearHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
