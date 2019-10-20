import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestinosTuristicosComponent } from './crear-destinos-turisticos.component';

describe('CrearDestinosTuristicosComponent', () => {
  let component: CrearDestinosTuristicosComponent;
  let fixture: ComponentFixture<CrearDestinosTuristicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDestinosTuristicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDestinosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
