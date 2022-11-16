import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFichierEditComponent } from './password-fichier-edit.component';

describe('PasswordFichierEditComponent', () => {
  let component: PasswordFichierEditComponent;
  let fixture: ComponentFixture<PasswordFichierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFichierEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFichierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
