import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolutionTacheComponent } from './resolution-tache.component';

describe('ResolutionTacheComponent', () => {
  let component: ResolutionTacheComponent;
  let fixture: ComponentFixture<ResolutionTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolutionTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolutionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
