import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePurchaseOrderComponent } from './create-or-update-purchase-order.component';

describe('CreateOrUpdatePurchaseOrderComponent', () => {
  let component: CreateOrUpdatePurchaseOrderComponent;
  let fixture: ComponentFixture<CreateOrUpdatePurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
