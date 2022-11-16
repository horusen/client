import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFileManagerComponent } from './header-file-manager.component';

describe('HeaderFileManagerComponent', () => {
  let component: HeaderFileManagerComponent;
  let fixture: ComponentFixture<HeaderFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderFileManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
