import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateOfficeRequisitionComponent } from './create-or-update-office-requisition.component';

describe('CreateOrUpdateOfficeRequisitionComponent', () => {
  let component: CreateOrUpdateOfficeRequisitionComponent;
  let fixture: ComponentFixture<CreateOrUpdateOfficeRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateOfficeRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateOfficeRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
