import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeShowComponent } from './groupe-show.component';

describe('GroupeShowComponent', () => {
  let component: GroupeShowComponent;
  let fixture: ComponentFixture<GroupeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
