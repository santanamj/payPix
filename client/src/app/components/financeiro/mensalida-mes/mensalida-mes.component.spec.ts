import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidaMesComponent } from './mensalida-mes.component';

describe('MensalidaMesComponent', () => {
  let component: MensalidaMesComponent;
  let fixture: ComponentFixture<MensalidaMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidaMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
