import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarExploreProfesseurComponent } from './sidebar-explore-professeur.component';

describe('SidebarExploreProfesseurComponent', () => {
  let component: SidebarExploreProfesseurComponent;
  let fixture: ComponentFixture<SidebarExploreProfesseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarExploreProfesseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarExploreProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
