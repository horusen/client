import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeSoloComponent } from './groupe-solo.component';

describe('GroupeSoloComponent', () => {
  let component: GroupeSoloComponent;
  let fixture: ComponentFixture<GroupeSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
