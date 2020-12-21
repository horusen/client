import { TestBed } from '@angular/core/testing';

import { RemarqueSolutionTacheService } from './remarque-solution-tache.service';

describe('RemarqueSolutionTacheService', () => {
  let service: RemarqueSolutionTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemarqueSolutionTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
