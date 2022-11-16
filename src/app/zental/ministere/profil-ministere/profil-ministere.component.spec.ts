import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMinistereComponent } from './profil-ministere.component';

describe('ProfilMinistereComponent', () => {
  let component: ProfilMinistereComponent;
  let fixture: ComponentFixture<ProfilMinistereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilMinistereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilMinistereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
