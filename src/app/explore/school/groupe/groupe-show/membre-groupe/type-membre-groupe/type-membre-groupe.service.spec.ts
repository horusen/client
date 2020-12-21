import { TestBed } from '@angular/core/testing';

import { TypeMembreGroupeService } from './type-membre-groupe.service';

describe('TypeMembreGroupeService', () => {
  let service: TypeMembreGroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMembreGroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
