import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurListMinComponent } from './professeur-list-min.component';

describe('ProfesseurListMinComponent', () => {
  let component: ProfesseurListMinComponent;
  let fixture: ComponentFixture<ProfesseurListMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurListMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
