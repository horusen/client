import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeCommentaireComponent } from './reaction-mode-commentaire.component';

describe('ReactionModeCommentaireComponent', () => {
  let component: ReactionModeCommentaireComponent;
  let fixture: ComponentFixture<ReactionModeCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeCommentaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
