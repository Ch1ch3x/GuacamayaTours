import { TestBed } from '@angular/core/testing';

import { DestinoTuristicoService } from './destino-turistico.service';

describe('DestinoTuristicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestinoTuristicoService = TestBed.get(DestinoTuristicoService);
    expect(service).toBeTruthy();
  });
});
