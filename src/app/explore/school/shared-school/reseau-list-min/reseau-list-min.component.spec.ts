import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseauListMinComponent } from './reseau-list-min.component';

describe('ReseauListMinComponent', () => {
  let component: ReseauListMinComponent;
  let fixture: ComponentFixture<ReseauListMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseauListMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseauListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
