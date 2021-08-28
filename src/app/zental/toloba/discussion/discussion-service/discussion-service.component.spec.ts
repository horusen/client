import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionServiceComponent } from './discussion-service.component';

describe('DiscussionServiceComponent', () => {
  let component: DiscussionServiceComponent;
  let fixture: ComponentFixture<DiscussionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
