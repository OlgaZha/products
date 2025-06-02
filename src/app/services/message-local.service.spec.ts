import { TestBed } from '@angular/core/testing';

import { MessageLocalService } from './message-local.service';

describe('MessageLocalService', () => {
  let service: MessageLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
