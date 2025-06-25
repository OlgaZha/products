import { TestBed } from '@angular/core/testing';

import { RxjsOperatorsUtilsService } from './rxjs-operators-utils.service';

describe('RxjsOperatorsUtilsService', () => {
  let service: RxjsOperatorsUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsOperatorsUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
