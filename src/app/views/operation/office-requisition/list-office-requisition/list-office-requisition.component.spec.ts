import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficeRequisitionComponent } from './list-office-requisition.component';

describe('ListOfficeRequisitionComponent', () => {
  let component: ListOfficeRequisitionComponent;
  let fixture: ComponentFixture<ListOfficeRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfficeRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfficeRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
