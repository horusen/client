import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeMessengerListComponent } from './reaction-mode-messenger-list.component';

describe('ReactionModeMessengerListComponent', () => {
  let component: ReactionModeMessengerListComponent;
  let fixture: ComponentFixture<ReactionModeMessengerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeMessengerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeMessengerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
