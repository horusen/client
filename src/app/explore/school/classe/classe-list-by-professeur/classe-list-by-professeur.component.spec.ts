import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseListByProfesseurComponent } from './classe-list-by-professeur.component';

describe('ClasseListByProfesseurComponent', () => {
  let component: ClasseListByProfesseurComponent;
  let fixture: ComponentFixture<ClasseListByProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseListByProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseListByProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
