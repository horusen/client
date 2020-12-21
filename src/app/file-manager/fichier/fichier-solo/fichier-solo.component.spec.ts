import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierSoloComponent } from './fichier-solo.component';

describe('FichierSoloComponent', () => {
  let component: FichierSoloComponent;
  let fixture: ComponentFixture<FichierSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichierSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
