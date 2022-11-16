import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserelleListComponent } from './passerelle-list.component';

describe('PasserelleListComponent', () => {
  let component: PasserelleListComponent;
  let fixture: ComponentFixture<PasserelleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserelleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserelleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
