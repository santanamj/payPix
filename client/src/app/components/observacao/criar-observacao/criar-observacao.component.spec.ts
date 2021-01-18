import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarObservacaoComponent } from './criar-observacao.component';

describe('CriarObservacaoComponent', () => {
  let component: CriarObservacaoComponent;
  let fixture: ComponentFixture<CriarObservacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarObservacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarObservacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
