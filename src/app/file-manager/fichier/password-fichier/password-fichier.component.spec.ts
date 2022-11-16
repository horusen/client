import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFichierComponent } from './password-fichier.component';

describe('PasswordFichierComponent', () => {
  let component: PasswordFichierComponent;
  let fixture: ComponentFixture<PasswordFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
