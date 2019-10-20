import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarHotelComponent } from './actualizar-hotel.component';

describe('ActualizarHotelComponent', () => {
  let component: ActualizarHotelComponent;
  let fixture: ComponentFixture<ActualizarHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
