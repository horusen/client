import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerPrivilegeMembreGroupeeComponent } from './changer-privilege-membre-groupee.component';

describe('ChangerPrivilegeMembreGroupeeComponent', () => {
  let component: ChangerPrivilegeMembreGroupeeComponent;
  let fixture: ComponentFixture<ChangerPrivilegeMembreGroupeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerPrivilegeMembreGroupeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerPrivilegeMembreGroupeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
