import { TestBed } from '@angular/core/testing';

import { SaveEventsService } from './save-events.service';

describe('SaveEventsService', () => {
  let service: SaveEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
