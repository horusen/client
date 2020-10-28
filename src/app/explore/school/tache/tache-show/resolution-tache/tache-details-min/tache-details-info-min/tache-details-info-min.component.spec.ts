import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailsInfoMinComponent } from './tache-details-info-min.component';

describe('TacheDetailsInfoMinComponent', () => {
  let component: TacheDetailsInfoMinComponent;
  let fixture: ComponentFixture<TacheDetailsInfoMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheDetailsInfoMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailsInfoMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
