import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosTuristicosComponent } from './destinos-turisticos.component';

describe('DestinosTuristicosComponent', () => {
  let component: DestinosTuristicosComponent;
  let fixture: ComponentFixture<DestinosTuristicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinosTuristicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
