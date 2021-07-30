import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserelleFilterComponent } from './passerelle-filter.component';

describe('PasserelleFilterComponent', () => {
  let component: PasserelleFilterComponent;
  let fixture: ComponentFixture<PasserelleFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserelleFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserelleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
