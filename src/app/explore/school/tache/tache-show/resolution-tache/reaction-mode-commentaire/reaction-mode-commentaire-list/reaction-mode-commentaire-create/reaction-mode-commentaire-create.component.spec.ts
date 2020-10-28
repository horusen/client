import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionModeCommentaireCreateComponent } from './reaction-mode-commentaire-create.component';

describe('ReactionModeCommentaireCreateComponent', () => {
  let component: ReactionModeCommentaireCreateComponent;
  let fixture: ComponentFixture<ReactionModeCommentaireCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactionModeCommentaireCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionModeCommentaireCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
