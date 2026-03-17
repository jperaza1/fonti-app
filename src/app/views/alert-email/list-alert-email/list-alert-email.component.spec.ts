import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlertEmailComponent } from './list-alert-email.component';

describe('ListAlertEmailComponent', () => {
  let component: ListAlertEmailComponent;
  let fixture: ComponentFixture<ListAlertEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlertEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlertEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
