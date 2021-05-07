import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurShowGroupeComponent } from './professeur-show-groupe.component';

describe('ProfesseurShowGroupeComponent', () => {
  let component: ProfesseurShowGroupeComponent;
  let fixture: ComponentFixture<ProfesseurShowGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurShowGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurShowGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
