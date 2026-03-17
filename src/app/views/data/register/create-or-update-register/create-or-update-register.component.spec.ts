import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRegisterComponent } from './create-or-update-register.component';

describe('CreateOrUpdateRegisterComponent', () => {
  let component: CreateOrUpdateRegisterComponent;
  let fixture: ComponentFixture<CreateOrUpdateRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
