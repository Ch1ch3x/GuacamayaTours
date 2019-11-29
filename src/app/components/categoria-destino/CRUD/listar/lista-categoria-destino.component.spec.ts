import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCategoriaDestinoComponent } from './lista-categoria-destino.component';

describe('ListaCategoriaDestinoComponent', () => {
  let component: ListaCategoriaDestinoComponent;
  let fixture: ComponentFixture<ListaCategoriaDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCategoriaDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCategoriaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
