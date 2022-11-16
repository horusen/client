import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierAddComponent } from './fichier-add.component';

describe('FichierAddComponent', () => {
  let component: FichierAddComponent;
  let fixture: ComponentFixture<FichierAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichierAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
