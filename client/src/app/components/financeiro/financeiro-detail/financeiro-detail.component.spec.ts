import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroDetailComponent } from './financeiro-detail.component';

describe('FinanceiroDetailComponent', () => {
  let component: FinanceiroDetailComponent;
  let fixture: ComponentFixture<FinanceiroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceiroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
