import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateInvoiceComponent } from './create-or-update-invoice.component';

describe('CreateOrUpdateInvoiceComponent', () => {
  let component: CreateOrUpdateInvoiceComponent;
  let fixture: ComponentFixture<CreateOrUpdateInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
