import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetSousReseauxListComponent } from './sujet-sous-reseaux-list.component';

describe('SujetSousReseauxListComponent', () => {
  let component: SujetSousReseauxListComponent;
  let fixture: ComponentFixture<SujetSousReseauxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetSousReseauxListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetSousReseauxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
