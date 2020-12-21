import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeListByProfesseurComponent } from './programme-list-by-professeur.component';

describe('ProgrammeListByProfesseurComponent', () => {
  let component: ProgrammeListByProfesseurComponent;
  let fixture: ComponentFixture<ProgrammeListByProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeListByProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeListByProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
