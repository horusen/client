import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTacheListComponent } from './affectation-tache-list.component';

describe('AffectationTacheListComponent', () => {
  let component: AffectationTacheListComponent;
  let fixture: ComponentFixture<AffectationTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
