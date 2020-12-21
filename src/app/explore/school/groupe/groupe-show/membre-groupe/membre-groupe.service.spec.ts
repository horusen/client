import { TestBed } from '@angular/core/testing';

import { MembreGroupeService } from './membre-groupe.service';

describe('MembreGroupeService', () => {
  let service: MembreGroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreGroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
