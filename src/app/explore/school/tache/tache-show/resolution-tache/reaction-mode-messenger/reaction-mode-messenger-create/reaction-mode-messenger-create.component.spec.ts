import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeMessengerCreateComponent } from './reaction-mode-messenger-create.component';

describe('ReactionModeMessengerCreateComponent', () => {
  let component: ReactionModeMessengerCreateComponent;
  let fixture: ComponentFixture<ReactionModeMessengerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeMessengerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeMessengerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
