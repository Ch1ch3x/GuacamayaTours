import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCategoriaDestinoComponent } from './actualizar-categoria-destino.component';

describe('ActualizarCategoriaDestinoComponent', () => {
  let component: ActualizarCategoriaDestinoComponent;
  let fixture: ComponentFixture<ActualizarCategoriaDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarCategoriaDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCategoriaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
