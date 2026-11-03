import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDispatchControlComponent } from './create-or-update-dispatch-control.component';

describe('CreateOrUpdateDispatchControlComponent', () => {
  let component: CreateOrUpdateDispatchControlComponent;
  let fixture: ComponentFixture<CreateOrUpdateDispatchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDispatchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateDispatchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
