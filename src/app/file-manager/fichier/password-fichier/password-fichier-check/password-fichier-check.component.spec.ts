import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFichierCheckComponent } from './password-fichier-check.component';

describe('PasswordFichierCheckComponent', () => {
  let component: PasswordFichierCheckComponent;
  let fixture: ComponentFixture<PasswordFichierCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFichierCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFichierCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
