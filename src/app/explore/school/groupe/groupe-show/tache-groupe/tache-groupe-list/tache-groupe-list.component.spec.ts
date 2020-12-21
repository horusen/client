import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheGroupeListComponent } from './tache-groupe-list.component';

describe('TacheGroupeListComponent', () => {
  let component: TacheGroupeListComponent;
  let fixture: ComponentFixture<TacheGroupeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheGroupeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheGroupeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
