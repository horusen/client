import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheEditComponent } from './solution-tache-edit.component';

describe('SolutionTacheEditComponent', () => {
  let component: SolutionTacheEditComponent;
  let fixture: ComponentFixture<SolutionTacheEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
