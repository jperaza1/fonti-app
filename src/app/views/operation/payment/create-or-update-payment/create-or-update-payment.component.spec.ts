import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdatePaymentComponent } from './create-or-update-payment.component';

describe('CreateOrUpdatePaymentComponent', () => {
  let component: CreateOrUpdatePaymentComponent;
  let fixture: ComponentFixture<CreateOrUpdatePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdatePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
