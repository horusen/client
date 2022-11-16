import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreMembreCabinetMinistreComponent } from './filtre-membre-cabinet-ministre.component';

describe('FiltreMembreCabinetMinistreComponent', () => {
  let component: FiltreMembreCabinetMinistreComponent;
  let fixture: ComponentFixture<FiltreMembreCabinetMinistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreMembreCabinetMinistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreMembreCabinetMinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
