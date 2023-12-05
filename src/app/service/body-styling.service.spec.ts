import { TestBed } from '@angular/core/testing';

import { BodyStylingService } from './body-styling.service';

describe('BodyStylingService', () => {
  let service: BodyStylingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyStylingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
