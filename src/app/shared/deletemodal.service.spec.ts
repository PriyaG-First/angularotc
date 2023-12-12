import { TestBed } from '@angular/core/testing';

import { DeletemodalService } from './deletemodal.service';

describe('DeletemodalService', () => {
  let service: DeletemodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletemodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
