import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvoiceSaleComponent } from './list-invoice-sale.component';

describe('ListInvoiceSaleComponent', () => {
  let component: ListInvoiceSaleComponent;
  let fixture: ComponentFixture<ListInvoiceSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvoiceSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvoiceSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
