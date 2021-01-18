import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidaMesFalteComponent } from './mensalida-mes-falte.component';

describe('MensalidaMesFalteComponent', () => {
  let component: MensalidaMesFalteComponent;
  let fixture: ComponentFixture<MensalidaMesFalteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidaMesFalteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidaMesFalteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
