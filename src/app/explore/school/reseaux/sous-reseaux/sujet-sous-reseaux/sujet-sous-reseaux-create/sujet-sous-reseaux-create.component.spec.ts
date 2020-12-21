import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetSousReseauxCreateComponent } from './sujet-sous-reseaux-create.component';

describe('SujetSousReseauxCreateComponent', () => {
  let component: SujetSousReseauxCreateComponent;
  let fixture: ComponentFixture<SujetSousReseauxCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetSousReseauxCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetSousReseauxCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
