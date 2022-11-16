import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSoloComponent } from './dossier-solo.component';

describe('DossierSoloComponent', () => {
  let component: DossierSoloComponent;
  let fixture: ComponentFixture<DossierSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
