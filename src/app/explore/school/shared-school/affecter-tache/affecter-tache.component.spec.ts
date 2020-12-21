import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterTacheComponent } from './affecter-tache.component';

describe('AffecterTacheComponent', () => {
  let component: AffecterTacheComponent;
  let fixture: ComponentFixture<AffecterTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
