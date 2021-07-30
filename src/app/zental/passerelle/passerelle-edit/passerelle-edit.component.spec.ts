import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserelleEditComponent } from './passerelle-edit.component';

describe('PasserelleEditComponent', () => {
  let component: PasserelleEditComponent;
  let fixture: ComponentFixture<PasserelleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserelleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserelleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
