import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosFinancasComponent } from './dados-financas.component';

describe('DadosFinancasComponent', () => {
  let component: DadosFinancasComponent;
  let fixture: ComponentFixture<DadosFinancasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosFinancasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosFinancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
