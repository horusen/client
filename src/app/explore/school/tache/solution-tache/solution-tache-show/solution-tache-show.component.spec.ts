import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheShowComponent } from './solution-tache-show.component';

describe('SolutionTacheShowComponent', () => {
  let component: SolutionTacheShowComponent;
  let fixture: ComponentFixture<SolutionTacheShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
