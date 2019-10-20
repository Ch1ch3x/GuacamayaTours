import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDestinosTuristicosComponent } from './actualizar-destinos-turisticos.component';

describe('ActualizarDestinosTuristicosComponent', () => {
  let component: ActualizarDestinosTuristicosComponent;
  let fixture: ComponentFixture<ActualizarDestinosTuristicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarDestinosTuristicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDestinosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
