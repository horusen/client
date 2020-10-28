import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheShowComponent } from './tache-show.component';

describe('TacheShowComponent', () => {
  let component: TacheShowComponent;
  let fixture: ComponentFixture<TacheShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
