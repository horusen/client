import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionTacheSoloComponent } from './solution-tache-solo.component';

describe('SolutionTacheSoloComponent', () => {
  let component: SolutionTacheSoloComponent;
  let fixture: ComponentFixture<SolutionTacheSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionTacheSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionTacheSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
