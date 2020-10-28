import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeMessengerSoloComponent } from './reaction-mode-messenger-solo.component';

describe('ReactionModeMessengerSoloComponent', () => {
  let component: ReactionModeMessengerSoloComponent;
  let fixture: ComponentFixture<ReactionModeMessengerSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeMessengerSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeMessengerSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
