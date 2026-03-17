import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchaseOrderInvoicesComponent } from './list-purchase-order-invoices.component';

describe('ListPurchaseOrderInvoicesComponent', () => {
  let component: ListPurchaseOrderInvoicesComponent;
  let fixture: ComponentFixture<ListPurchaseOrderInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchaseOrderInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchaseOrderInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
