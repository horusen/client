import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieTacheListComponent } from './suivie-tache-list.component';

describe('SuivieTacheListComponent', () => {
  let component: SuivieTacheListComponent;
  let fixture: ComponentFixture<SuivieTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivieTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivieTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
