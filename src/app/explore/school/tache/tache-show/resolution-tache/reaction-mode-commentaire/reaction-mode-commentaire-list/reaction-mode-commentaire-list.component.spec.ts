import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeCommentaireListComponent } from './reaction-mode-commentaire-list.component';

describe('ReactionModeCommentaireListComponent', () => {
  let component: ReactionModeCommentaireListComponent;
  let fixture: ComponentFixture<ReactionModeCommentaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeCommentaireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeCommentaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
