import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentiteGroupeComponent } from './identite-groupe.component';

describe('IdentiteGroupeComponent', () => {
  let component: IdentiteGroupeComponent;
  let fixture: ComponentFixture<IdentiteGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentiteGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentiteGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
