import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieTacheComponent } from './suivie-tache.component';

describe('SuivieTacheComponent', () => {
  let component: SuivieTacheComponent;
  let fixture: ComponentFixture<SuivieTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivieTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivieTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
