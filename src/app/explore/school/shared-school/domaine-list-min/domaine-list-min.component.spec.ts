import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineListMinComponent } from './domaine-list-min.component';

describe('DomaineListMinComponent', () => {
  let component: DomaineListMinComponent;
  let fixture: ComponentFixture<DomaineListMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomaineListMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
