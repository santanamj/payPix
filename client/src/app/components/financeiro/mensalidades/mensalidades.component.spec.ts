import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensalidadesComponent } from './mensalidades.component';

describe('MensalidadesComponent', () => {
  let component: MensalidadesComponent;
  let fixture: ComponentFixture<MensalidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensalidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
