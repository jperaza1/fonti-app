import { TestBed } from '@angular/core/testing';

import { RepairEquipmentService } from './repair-equipment.service';

describe('RepairEquipmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairEquipmentService = TestBed.get(RepairEquipmentService);
    expect(service).toBeTruthy();
  });
});
