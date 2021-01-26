import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEtablissementShowComponent } from './type-etablissement-show.component';

describe('TypeEtablissementShowComponent', () => {
  let component: TypeEtablissementShowComponent;
  let fixture: ComponentFixture<TypeEtablissementShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEtablissementShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEtablissementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
