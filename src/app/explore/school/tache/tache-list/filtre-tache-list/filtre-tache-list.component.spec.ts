import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreTacheListComponent } from './filtre-tache-list.component';

describe('FiltreTacheListComponent', () => {
  let component: FiltreTacheListComponent;
  let fixture: ComponentFixture<FiltreTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreTacheListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
