import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistreurAudioComponent } from './enregistreur-audio.component';

describe('EnregistreurAudioComponent', () => {
  let component: EnregistreurAudioComponent;
  let fixture: ComponentFixture<EnregistreurAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistreurAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistreurAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
