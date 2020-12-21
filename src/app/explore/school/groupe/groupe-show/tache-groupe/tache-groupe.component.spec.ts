import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheGroupeComponent } from './tache-groupe.component';

describe('TacheGroupeComponent', () => {
  let component: TacheGroupeComponent;
  let fixture: ComponentFixture<TacheGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
