import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAssetsComponent } from './personal-assets.component';

describe('PersonalAssetsComponent', () => {
  let component: PersonalAssetsComponent;
  let fixture: ComponentFixture<PersonalAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
