import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadeLiaisonComponent } from './ambassade-liaison.component';

describe('AmbassadeLiaisonComponent', () => {
  let component: AmbassadeLiaisonComponent;
  let fixture: ComponentFixture<AmbassadeLiaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbassadeLiaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadeLiaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
