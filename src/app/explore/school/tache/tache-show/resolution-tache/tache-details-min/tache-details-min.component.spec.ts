import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailsMinComponent } from './tache-details-min.component';

describe('TacheDetailsMinComponent', () => {
  let component: TacheDetailsMinComponent;
  let fixture: ComponentFixture<TacheDetailsMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheDetailsMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailsMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
