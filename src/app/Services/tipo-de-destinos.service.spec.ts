import { TestBed } from '@angular/core/testing';

import { TipoDeDestinosService } from './tipo-de-destinos.service';

describe('TipoDeDestinosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoDeDestinosService = TestBed.get(TipoDeDestinosService);
    expect(service).toBeTruthy();
  });
});
