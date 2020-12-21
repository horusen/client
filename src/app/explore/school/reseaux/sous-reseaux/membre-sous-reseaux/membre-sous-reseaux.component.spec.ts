import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreSousReseauxComponent } from './membre-sous-reseaux.component';

describe('MembreSousReseauxComponent', () => {
  let component: MembreSousReseauxComponent;
  let fixture: ComponentFixture<MembreSousReseauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreSousReseauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreSousReseauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
