import { TestBed } from '@angular/core/testing';

import { DestinosService } from './destinos.service';

describe('DestinosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestinosService = TestBed.get(DestinosService);
    expect(service).toBeTruthy();
  });
});
