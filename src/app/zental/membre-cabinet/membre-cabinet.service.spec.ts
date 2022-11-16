import { TestBed } from '@angular/core/testing';

import { MembreCabinetService } from './membre-cabinet.service';

describe('MembreCabinetService', () => {
  let service: MembreCabinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreCabinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
