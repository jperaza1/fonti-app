import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateAlertEmailComponent } from './create-or-update-alert-email.component';

describe('CreateOrUpdateAlertEmailComponent', () => {
  let component: CreateOrUpdateAlertEmailComponent;
  let fixture: ComponentFixture<CreateOrUpdateAlertEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateAlertEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateAlertEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
