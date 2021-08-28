import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulatIciMonPaysComponent } from './consulat-ici-mon-pays.component';

describe('ConsulatIciMonPaysComponent', () => {
  let component: ConsulatIciMonPaysComponent;
  let fixture: ComponentFixture<ConsulatIciMonPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulatIciMonPaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulatIciMonPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
