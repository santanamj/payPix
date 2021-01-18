import { TestBed } from '@angular/core/testing';

import { ObservacaoService } from './observacao.service';

describe('ObservacaoService', () => {
  let service: ObservacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
