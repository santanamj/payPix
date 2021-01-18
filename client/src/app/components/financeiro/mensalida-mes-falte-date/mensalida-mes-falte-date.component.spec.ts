import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidaMesFalteDateComponent } from './mensalida-mes-falte-date.component';

describe('MensalidaMesFalteDateComponent', () => {
  let component: MensalidaMesFalteDateComponent;
  let fixture: ComponentFixture<MensalidaMesFalteDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidaMesFalteDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidaMesFalteDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
