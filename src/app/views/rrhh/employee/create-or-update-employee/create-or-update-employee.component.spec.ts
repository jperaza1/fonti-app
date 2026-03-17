import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateEmployeeComponent } from './create-or-update-employee.component';

describe('CreateOrUpdateEmployeeComponent', () => {
  let component: CreateOrUpdateEmployeeComponent;
  let fixture: ComponentFixture<CreateOrUpdateEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
