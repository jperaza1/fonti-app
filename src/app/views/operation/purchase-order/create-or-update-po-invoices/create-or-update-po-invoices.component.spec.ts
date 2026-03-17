import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePoInvoicesComponent } from './create-or-update-po-invoices.component';

describe('CreateOrUpdatePoInvoicesComponent', () => {
  let component: CreateOrUpdatePoInvoicesComponent;
  let fixture: ComponentFixture<CreateOrUpdatePoInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePoInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdatePoInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
