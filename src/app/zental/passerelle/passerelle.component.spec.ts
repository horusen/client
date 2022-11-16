import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserelleComponent } from './passerelle.component';

describe('PasserelleComponent', () => {
  let component: PasserelleComponent;
  let fixture: ComponentFixture<PasserelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
