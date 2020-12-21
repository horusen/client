import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreGroupeListComponent } from './membre-groupe-list.component';

describe('MembreGroupeListComponent', () => {
  let component: MembreGroupeListComponent;
  let fixture: ComponentFixture<MembreGroupeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreGroupeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreGroupeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
