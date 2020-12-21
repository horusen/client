import { TestBed } from '@angular/core/testing';

import { SujetSousReseauxService } from './sujet-sous-reseaux.service';

describe('SujetSousReseauxService', () => {
  let service: SujetSousReseauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SujetSousReseauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
