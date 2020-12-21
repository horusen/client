import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTacheCreateComponent } from './affectation-tache-create.component';

describe('AffectationTacheCreateComponent', () => {
  let component: AffectationTacheCreateComponent;
  let fixture: ComponentFixture<AffectationTacheCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTacheCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTacheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
