import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionTacheCreateComponent } from './correction-tache-create.component';

describe('CorrectionTacheCreateComponent', () => {
  let component: CorrectionTacheCreateComponent;
  let fixture: ComponentFixture<CorrectionTacheCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionTacheCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionTacheCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
