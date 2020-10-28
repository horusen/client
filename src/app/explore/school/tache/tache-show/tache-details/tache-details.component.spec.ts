import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDetailsComponent } from './tache-details.component';

describe('TacheDetailsComponent', () => {
  let component: TacheDetailsComponent;
  let fixture: ComponentFixture<TacheDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
