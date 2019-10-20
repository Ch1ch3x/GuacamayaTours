import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCiudadComponent } from './actualizar-ciudad.component';

describe('ActualizarCiudadComponent', () => {
  let component: ActualizarCiudadComponent;
  let fixture: ComponentFixture<ActualizarCiudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarCiudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
