import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurTacheListComponent } from './professeur-tache-list.component';

describe('ProfesseurTacheListComponent', () => {
  let component: ProfesseurTacheListComponent;
  let fixture: ComponentFixture<ProfesseurTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
