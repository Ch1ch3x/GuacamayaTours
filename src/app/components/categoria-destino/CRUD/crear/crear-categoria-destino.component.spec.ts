import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaDestinoComponent } from './crear-categoria-destino.component';

describe('CrearCategoriaDestinoComponent', () => {
  let component: CrearCategoriaDestinoComponent;
  let fixture: ComponentFixture<CrearCategoriaDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCategoriaDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCategoriaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
