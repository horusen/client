import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreGroupeAddComponent } from './membre-groupe-add.component';

describe('MembreGroupeAddComponent', () => {
  let component: MembreGroupeAddComponent;
  let fixture: ComponentFixture<MembreGroupeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreGroupeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreGroupeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
