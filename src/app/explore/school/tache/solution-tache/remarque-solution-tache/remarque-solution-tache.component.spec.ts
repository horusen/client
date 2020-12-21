import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarqueSolutionTacheComponent } from './remarque-solution-tache.component';

describe('RemarqueSolutionTacheComponent', () => {
  let component: RemarqueSolutionTacheComponent;
  let fixture: ComponentFixture<RemarqueSolutionTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarqueSolutionTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarqueSolutionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
