import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeMessengerComponent } from './reaction-mode-messenger.component';

describe('ReactionModeMessengerComponent', () => {
  let component: ReactionModeMessengerComponent;
  let fixture: ComponentFixture<ReactionModeMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
