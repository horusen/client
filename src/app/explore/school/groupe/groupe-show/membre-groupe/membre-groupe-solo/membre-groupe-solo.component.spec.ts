import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreGroupeSoloComponent } from './membre-groupe-solo.component';

describe('MembreGroupeSoloComponent', () => {
  let component: MembreGroupeSoloComponent;
  let fixture: ComponentFixture<MembreGroupeSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreGroupeSoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreGroupeSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
