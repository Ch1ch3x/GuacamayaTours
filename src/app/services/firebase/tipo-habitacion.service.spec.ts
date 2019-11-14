import { TestBed } from '@angular/core/testing';

import { TipoHabitacionService } from './tipo-habitacion.service';

describe('TipoHabitacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoHabitacionService = TestBed.get(TipoHabitacionService);
    expect(service).toBeTruthy();
  });
});
