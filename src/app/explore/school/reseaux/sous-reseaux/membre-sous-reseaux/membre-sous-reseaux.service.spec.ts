import { TestBed } from '@angular/core/testing';

import { MembreSousReseauxService } from './membre-sous-reseaux.service';

describe('MembreSousReseauxService', () => {
  let service: MembreSousReseauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreSousReseauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
