import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadeCitoyenComponent } from './ambassade-citoyen.component';

describe('AmbassadeCitoyenComponent', () => {
  let component: AmbassadeCitoyenComponent;
  let fixture: ComponentFixture<AmbassadeCitoyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbassadeCitoyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadeCitoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
