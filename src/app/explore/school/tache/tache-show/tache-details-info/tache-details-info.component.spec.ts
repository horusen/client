import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailsInfoComponent } from './tache-details-info.component';

describe('TacheDetailsInfoComponent', () => {
  let component: TacheDetailsInfoComponent;
  let fixture: ComponentFixture<TacheDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheDetailsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
