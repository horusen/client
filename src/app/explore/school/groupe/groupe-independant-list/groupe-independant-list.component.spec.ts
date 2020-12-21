import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeIndependantListComponent } from './groupe-independant-list.component';

describe('GroupeIndependantListComponent', () => {
  let component: GroupeIndependantListComponent;
  let fixture: ComponentFixture<GroupeIndependantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeIndependantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeIndependantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
