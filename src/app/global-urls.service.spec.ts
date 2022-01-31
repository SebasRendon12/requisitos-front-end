import { TestBed } from '@angular/core/testing';

import { GlobalUrlsService } from './global-urls.service';

describe('GlobalUrlsService', () => {
  let service: GlobalUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
