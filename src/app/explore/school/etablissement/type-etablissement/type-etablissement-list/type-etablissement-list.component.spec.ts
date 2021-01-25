import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEtablissementListComponent } from './type-etablissement-list.component';

describe('TypeEtablissementListComponent', () => {
  let component: TypeEtablissementListComponent;
  let fixture: ComponentFixture<TypeEtablissementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEtablissementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEtablissementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
