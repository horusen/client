import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulShowComponent } from './consul-show.component';

describe('ConsulShowComponent', () => {
  let component: ConsulShowComponent;
  let fixture: ComponentFixture<ConsulShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
