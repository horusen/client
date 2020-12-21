import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeEditComponent } from './groupe-edit.component';

describe('GroupeEditComponent', () => {
  let component: GroupeEditComponent;
  let fixture: ComponentFixture<GroupeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
