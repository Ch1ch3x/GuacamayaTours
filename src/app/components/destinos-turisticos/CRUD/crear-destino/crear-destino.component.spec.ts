import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestinoComponent } from './crear-destino.component';

describe('CrearDestinoComponent', () => {
  let component: CrearDestinoComponent;
  let fixture: ComponentFixture<CrearDestinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDestinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
