import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZentalAmbassadeShowComponent } from './zental-ambassade-show.component';

describe('ZentalAmbassadeShowComponent', () => {
  let component: ZentalAmbassadeShowComponent;
  let fixture: ComponentFixture<ZentalAmbassadeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZentalAmbassadeShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZentalAmbassadeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
