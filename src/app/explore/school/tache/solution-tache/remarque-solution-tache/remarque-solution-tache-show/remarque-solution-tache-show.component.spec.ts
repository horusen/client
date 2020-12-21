import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarqueSolutionTacheShowComponent } from './remarque-solution-tache-show.component';

describe('RemarqueSolutionTacheShowComponent', () => {
  let component: RemarqueSolutionTacheShowComponent;
  let fixture: ComponentFixture<RemarqueSolutionTacheShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarqueSolutionTacheShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarqueSolutionTacheShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
