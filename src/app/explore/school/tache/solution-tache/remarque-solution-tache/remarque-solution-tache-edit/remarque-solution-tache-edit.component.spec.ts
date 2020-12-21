import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarqueSolutionTacheEditComponent } from './remarque-solution-tache-edit.component';

describe('RemarqueSolutionTacheEditComponent', () => {
  let component: RemarqueSolutionTacheEditComponent;
  let fixture: ComponentFixture<RemarqueSolutionTacheEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarqueSolutionTacheEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarqueSolutionTacheEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
