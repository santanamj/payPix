import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDataComponent } from './relatorio-data.component';

describe('RelatorioDataComponent', () => {
  let component: RelatorioDataComponent;
  let fixture: ComponentFixture<RelatorioDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
