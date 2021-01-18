import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidaMesDateComponent } from './mensalida-mes-date.component';

describe('MensalidaMesDateComponent', () => {
  let component: MensalidaMesDateComponent;
  let fixture: ComponentFixture<MensalidaMesDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidaMesDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidaMesDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
