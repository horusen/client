import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierListMinComponent } from './dossier-list-min.component';

describe('DossierListMinComponent', () => {
  let component: DossierListMinComponent;
  let fixture: ComponentFixture<DossierListMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierListMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierListMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
