import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarExploreGroupeComponent } from './sidebar-explore-groupe.component';

describe('SidebarExploreGroupeComponent', () => {
  let component: SidebarExploreGroupeComponent;
  let fixture: ComponentFixture<SidebarExploreGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarExploreGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarExploreGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
