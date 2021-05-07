import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurShowClasseComponent } from './professeur-show-classe.component';

describe('ProfesseurShowClasseComponent', () => {
  let component: ProfesseurShowClasseComponent;
  let fixture: ComponentFixture<ProfesseurShowClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesseurShowClasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesseurShowClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
