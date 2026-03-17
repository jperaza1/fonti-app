import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateGroupRoleComponent } from './create-or-update-group-role.component';

describe('CreateOrUpdateGroupRoleComponent', () => {
  let component: CreateOrUpdateGroupRoleComponent;
  let fixture: ComponentFixture<CreateOrUpdateGroupRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateGroupRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateGroupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
