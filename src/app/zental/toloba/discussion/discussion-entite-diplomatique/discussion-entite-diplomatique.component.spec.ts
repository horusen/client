import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionEntiteDiplomatiqueComponent } from './discussion-entite-diplomatique.component';

describe('DiscussionEntiteDiplomatiqueComponent', () => {
  let component: DiscussionEntiteDiplomatiqueComponent;
  let fixture: ComponentFixture<DiscussionEntiteDiplomatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionEntiteDiplomatiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionEntiteDiplomatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
