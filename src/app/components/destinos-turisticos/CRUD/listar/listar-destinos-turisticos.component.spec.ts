import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDestinosTuristicosComponent } from './listar-destinos-turisticos.component';

describe('ListarDestinosTuristicosComponent', () => {
  let component: ListarDestinosTuristicosComponent;
  let fixture: ComponentFixture<ListarDestinosTuristicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDestinosTuristicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDestinosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
