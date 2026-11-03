import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceSaleComponent } from './view-invoice-sale.component';

describe('ViewInvoiceSaleComponent', () => {
  let component: ViewInvoiceSaleComponent;
  let fixture: ComponentFixture<ViewInvoiceSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvoiceSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvoiceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
