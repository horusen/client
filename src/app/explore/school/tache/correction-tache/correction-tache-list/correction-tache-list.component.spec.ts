import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionTacheListComponent } from './correction-tache-list.component';

describe('CorrectionTacheListComponent', () => {
  let component: CorrectionTacheListComponent;
  let fixture: ComponentFixture<CorrectionTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
