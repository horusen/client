import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteReactionTacheComponent } from './note-reaction-tache.component';

describe('NoteReactionTacheComponent', () => {
  let component: NoteReactionTacheComponent;
  let fixture: ComponentFixture<NoteReactionTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteReactionTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteReactionTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
