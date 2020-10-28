import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeTacheListMinComponent } from './groupe-tache-list-min.component';

describe('GroupeTacheListMinComponent', () => {
  let component: GroupeTacheListMinComponent;
  let fixture: ComponentFixture<GroupeTacheListMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeTacheListMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeTacheListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
