import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulListComponent } from './consul-list.component';

describe('ConsulListComponent', () => {
  let component: ConsulListComponent;
  let fixture: ComponentFixture<ConsulListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
