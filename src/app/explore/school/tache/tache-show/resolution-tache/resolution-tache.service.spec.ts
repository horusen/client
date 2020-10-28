import { TestBed } from '@angular/core/testing';

import { ResolutionTacheService } from './resolution-tache.service';

describe('ResolutionTacheService', () => {
  let service: ResolutionTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolutionTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
