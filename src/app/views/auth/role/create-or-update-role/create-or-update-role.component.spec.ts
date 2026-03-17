import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRoleComponent } from './create-or-update-role.component';

describe('CreateOrUpdateRoleComponent', () => {
  let component: CreateOrUpdateRoleComponent;
  let fixture: ComponentFixture<CreateOrUpdateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
