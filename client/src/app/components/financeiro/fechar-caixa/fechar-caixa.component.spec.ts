import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharCaixaComponent } from './fechar-caixa.component';

describe('FecharCaixaComponent', () => {
  let component: FecharCaixaComponent;
  let fixture: ComponentFixture<FecharCaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FecharCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FecharCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
