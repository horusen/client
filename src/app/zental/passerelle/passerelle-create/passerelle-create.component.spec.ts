import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasserelleCreateComponent } from './passerelle-create.component';

describe('PasserelleCreateComponent', () => {
  let component: PasserelleCreateComponent;
  let fixture: ComponentFixture<PasserelleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasserelleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasserelleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
