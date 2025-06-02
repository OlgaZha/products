import { TestBed } from '@angular/core/testing';

import { MessageRootService } from './message-root.service';

describe('MessageRootService', () => {
  let service: MessageRootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageRootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
