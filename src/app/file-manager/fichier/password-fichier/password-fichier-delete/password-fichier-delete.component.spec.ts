import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFichierDeleteComponent } from './password-fichier-delete.component';

describe('PasswordFichierDeleteComponent', () => {
  let component: PasswordFichierDeleteComponent;
  let fixture: ComponentFixture<PasswordFichierDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordFichierDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFichierDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
