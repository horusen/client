import { TestBed } from '@angular/core/testing';

import { SolutionTacheService } from './solution-tache.service';

describe('SolutionTacheService', () => {
  let service: SolutionTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
