import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreGroupeComponent } from './membre-groupe.component';

describe('MembreGroupeComponent', () => {
  let component: MembreGroupeComponent;
  let fixture: ComponentFixture<MembreGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
