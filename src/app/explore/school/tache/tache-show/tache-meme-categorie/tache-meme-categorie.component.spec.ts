import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheMemeCategorieComponent } from './tache-meme-categorie.component';

describe('TacheMemeCategorieComponent', () => {
  let component: TacheMemeCategorieComponent;
  let fixture: ComponentFixture<TacheMemeCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheMemeCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheMemeCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
