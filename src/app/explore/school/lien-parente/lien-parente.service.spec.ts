import { TestBed } from '@angular/core/testing';

import { LienParenteService } from './lien-parente.service';

describe('LienParenteService', () => {
  let service: LienParenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienParenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
