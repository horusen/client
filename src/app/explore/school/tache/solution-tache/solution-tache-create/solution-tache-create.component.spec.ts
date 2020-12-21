import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheCreateComponent } from './solution-tache-create.component';

describe('SolutionTacheCreateComponent', () => {
  let component: SolutionTacheCreateComponent;
  let fixture: ComponentFixture<SolutionTacheCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
