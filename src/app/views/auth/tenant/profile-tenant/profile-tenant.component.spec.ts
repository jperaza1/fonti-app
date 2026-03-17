import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTenantComponent } from './profile-tenant.component';

describe('ProfileTenantComponent', () => {
  let component: ProfileTenantComponent;
  let fixture: ComponentFixture<ProfileTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
