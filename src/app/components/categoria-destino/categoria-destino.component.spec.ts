import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDestinoComponent } from './categoria-destino.component';

describe('CategoriaDestinoComponent', () => {
  let component: CategoriaDestinoComponent;
  let fixture: ComponentFixture<CategoriaDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
