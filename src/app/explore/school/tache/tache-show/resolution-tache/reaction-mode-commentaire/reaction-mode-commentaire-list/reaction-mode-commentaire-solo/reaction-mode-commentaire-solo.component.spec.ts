import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeCommentaireSoloComponent } from './reaction-mode-commentaire-solo.component';

describe('ReactionModeCommentaireSoloComponent', () => {
  let component: ReactionModeCommentaireSoloComponent;
  let fixture: ComponentFixture<ReactionModeCommentaireSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeCommentaireSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeCommentaireSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
