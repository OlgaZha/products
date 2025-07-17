import { TestBed } from '@angular/core/testing';

import { UserSelectionServiceService } from './user-selection-service.service';

describe('UserSelectionServiceService', () => {
  let service: UserSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
