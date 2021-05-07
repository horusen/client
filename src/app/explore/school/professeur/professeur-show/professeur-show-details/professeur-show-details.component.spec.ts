import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurShowDetailsComponent } from './professeur-show-details.component';

describe('ProfesseurShowDetailsComponent', () => {
  let component: ProfesseurShowDetailsComponent;
  let fixture: ComponentFixture<ProfesseurShowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurShowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
