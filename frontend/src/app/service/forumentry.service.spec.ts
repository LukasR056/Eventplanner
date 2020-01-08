import { TestBed } from '@angular/core/testing';

import { ForumentryService } from './forumentry.service';

describe('ForumentryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumentryService = TestBed.get(ForumentryService);
    expect(service).toBeTruthy();
  });
});
