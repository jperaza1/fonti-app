import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupRoleComponent } from './list-group-role.component';

describe('ListGroupRoleComponent', () => {
  let component: ListGroupRoleComponent;
  let fixture: ComponentFixture<ListGroupRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGroupRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
