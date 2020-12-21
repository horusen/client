import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFichierAddComponent } from './password-fichier-add.component';

describe('PasswordFichierAddComponent', () => {
  let component: PasswordFichierAddComponent;
  let fixture: ComponentFixture<PasswordFichierAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFichierAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFichierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
