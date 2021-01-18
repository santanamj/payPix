import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroDateComponent } from './financeiro-date.component';

describe('FinanceiroDateComponent', () => {
  let component: FinanceiroDateComponent;
  let fixture: ComponentFixture<FinanceiroDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceiroDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
