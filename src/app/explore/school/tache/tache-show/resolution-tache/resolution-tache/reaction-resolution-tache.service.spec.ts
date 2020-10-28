import { TestBed } from '@angular/core/testing';

import { ReactionResolutionTacheService } from './reaction-resolution-tache.service';

describe('ReactionResolutionTacheService', () => {
  let service: ReactionResolutionTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactionResolutionTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
