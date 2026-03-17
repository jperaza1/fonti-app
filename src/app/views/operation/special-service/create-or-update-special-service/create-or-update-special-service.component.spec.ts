import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateSpecialServiceComponent } from './create-or-update-special-service.component';

describe('CreateOrUpdateSpecialServiceComponent', () => {
  let component: CreateOrUpdateSpecialServiceComponent;
  let fixture: ComponentFixture<CreateOrUpdateSpecialServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateSpecialServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateSpecialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
