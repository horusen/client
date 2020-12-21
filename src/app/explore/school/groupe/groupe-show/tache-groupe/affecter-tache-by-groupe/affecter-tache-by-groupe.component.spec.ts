import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterTacheByGroupeComponent } from './affecter-tache-by-groupe.component';

describe('AffecterTacheByGroupeComponent', () => {
  let component: AffecterTacheByGroupeComponent;
  let fixture: ComponentFixture<AffecterTacheByGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterTacheByGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterTacheByGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
