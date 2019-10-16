import { TestBed } from '@angular/core/testing';

import { FulldayService } from './fullday.service';

describe('FulldayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FulldayService = TestBed.get(FulldayService);
    expect(service).toBeTruthy();
  });
});
