import { TestBed } from '@angular/core/testing';

import { TypegroupService } from './typegroup.service';

describe('TypegroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypegroupService = TestBed.get(TypegroupService);
    expect(service).toBeTruthy();
  });
});
