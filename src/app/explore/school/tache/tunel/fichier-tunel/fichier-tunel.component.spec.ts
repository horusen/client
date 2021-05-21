import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierTunelComponent } from './fichier-tunel.component';

describe('FichierTunelComponent', () => {
  let component: FichierTunelComponent;
  let fixture: ComponentFixture<FichierTunelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichierTunelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichierTunelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
