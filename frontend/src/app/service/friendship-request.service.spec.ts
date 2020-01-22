import { TestBed } from '@angular/core/testing';

import { FriendshipRequestService } from './friendship-request.service';

describe('FriendshipRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendshipRequestService = TestBed.get(FriendshipRequestService);
    expect(service).toBeTruthy();
  });
});
