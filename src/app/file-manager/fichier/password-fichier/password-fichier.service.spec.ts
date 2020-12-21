import { TestBed } from '@angular/core/testing';

import { PasswordFichierService } from './password-fichier.service';

describe('PasswordFichierService', () => {
  let service: PasswordFichierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordFichierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
