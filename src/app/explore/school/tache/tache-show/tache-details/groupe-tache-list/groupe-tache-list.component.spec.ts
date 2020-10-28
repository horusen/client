import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeTacheListComponent } from './groupe-tache-list.component';

describe('GroupeTacheListComponent', () => {
  let component: GroupeTacheListComponent;
  let fixture: ComponentFixture<GroupeTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
