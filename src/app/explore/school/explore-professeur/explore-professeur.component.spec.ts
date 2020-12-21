import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreProfesseurComponent } from './explore-professeur.component';

describe('ExploreProfesseurComponent', () => {
  let component: ExploreProfesseurComponent;
  let fixture: ComponentFixture<ExploreProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
