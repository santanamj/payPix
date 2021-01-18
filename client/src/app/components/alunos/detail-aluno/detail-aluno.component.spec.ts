import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAlunoComponent } from './detail-aluno.component';

describe('DetailAlunoComponent', () => {
  let component: DetailAlunoComponent;
  let fixture: ComponentFixture<DetailAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
