import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreGroupeComponent } from './explore-groupe.component';

describe('ExploreGroupeComponent', () => {
  let component: ExploreGroupeComponent;
  let fixture: ComponentFixture<ExploreGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
