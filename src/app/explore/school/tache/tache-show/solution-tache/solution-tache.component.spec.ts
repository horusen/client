import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheComponent } from './solution-tache.component';

describe('SolutionTacheComponent', () => {
  let component: SolutionTacheComponent;
  let fixture: ComponentFixture<SolutionTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
