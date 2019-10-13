import { TestBed } from '@angular/core/testing';

import { DestinosTuristicosService } from './destinos-turisticos.service';

describe('DestinosTuristicosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestinosTuristicosService = TestBed.get(DestinosTuristicosService);
    expect(service).toBeTruthy();
  });
});
