import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPartielAmbassadeComponent } from './description-partiel-ambassade.component';

describe('DescriptionPartielAmbassadeComponent', () => {
  let component: DescriptionPartielAmbassadeComponent;
  let fixture: ComponentFixture<DescriptionPartielAmbassadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionPartielAmbassadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPartielAmbassadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
