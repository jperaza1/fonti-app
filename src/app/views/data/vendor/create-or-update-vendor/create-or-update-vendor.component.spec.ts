import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateVendorComponent } from './create-or-update-vendor.component';

describe('CreateOrUpdateVendorComponent', () => {
  let component: CreateOrUpdateVendorComponent;
  let fixture: ComponentFixture<CreateOrUpdateVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
