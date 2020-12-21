import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheListComponent } from './solution-tache-list.component';

describe('SolutionTacheListComponent', () => {
  let component: SolutionTacheListComponent;
  let fixture: ComponentFixture<SolutionTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
