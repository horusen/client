import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarqueSolutionTacheCreateComponent } from './remarque-solution-tache-create.component';

describe('RemarqueSolutionTacheCreateComponent', () => {
  let component: RemarqueSolutionTacheCreateComponent;
  let fixture: ComponentFixture<RemarqueSolutionTacheCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarqueSolutionTacheCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarqueSolutionTacheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
