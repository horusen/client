import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurShowTacheComponent } from './professeur-show-tache.component';

describe('ProfesseurShowTacheComponent', () => {
  let component: ProfesseurShowTacheComponent;
  let fixture: ComponentFixture<ProfesseurShowTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurShowTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurShowTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
