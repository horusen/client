import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutresCorrectionsComponent } from './autres-corrections.component';

describe('AutresCorrectionsComponent', () => {
  let component: AutresCorrectionsComponent;
  let fixture: ComponentFixture<AutresCorrectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutresCorrectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutresCorrectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
