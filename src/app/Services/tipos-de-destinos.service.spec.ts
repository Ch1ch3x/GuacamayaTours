import { TestBed } from '@angular/core/testing';

import { TiposDeDestinosService } from './tipos-de-destinos.service';

describe('TiposDeDestinosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposDeDestinosService = TestBed.get(TiposDeDestinosService);
    expect(service).toBeTruthy();
  });
});
