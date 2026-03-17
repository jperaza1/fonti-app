import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateTenantComponent } from './create-or-update-tenant.component';

describe('CreateOrUpdateTenantComponent', () => {
  let component: CreateOrUpdateTenantComponent;
  let fixture: ComponentFixture<CreateOrUpdateTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
