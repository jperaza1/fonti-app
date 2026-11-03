import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBillingReportComponent } from './pending-billing-report.component';

describe('PendingBillingReportComponent', () => {
  let component: PendingBillingReportComponent;
  let fixture: ComponentFixture<PendingBillingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingBillingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingBillingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
