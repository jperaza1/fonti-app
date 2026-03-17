import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateTypeComponent } from './create-or-update-type.component';

describe('CreateOrUpdateTypeComponent', () => {
  let component: CreateOrUpdateTypeComponent;
  let fixture: ComponentFixture<CreateOrUpdateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
