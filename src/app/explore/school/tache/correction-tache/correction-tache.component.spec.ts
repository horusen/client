import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionTacheComponent } from './correction-tache.component';

describe('CorrectionTacheComponent', () => {
  let component: CorrectionTacheComponent;
  let fixture: ComponentFixture<CorrectionTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
