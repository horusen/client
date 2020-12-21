import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetSousReseauxShowComponent } from './sujet-sous-reseaux-show.component';

describe('SujetSousReseauxShowComponent', () => {
  let component: SujetSousReseauxShowComponent;
  let fixture: ComponentFixture<SujetSousReseauxShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetSousReseauxShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetSousReseauxShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
