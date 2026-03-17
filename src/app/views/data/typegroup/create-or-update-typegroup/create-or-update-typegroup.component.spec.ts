import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateTypegroupComponent } from './create-or-update-typegroup.component';

describe('CreateOrUpdateTypegroupComponent', () => {
  let component: CreateOrUpdateTypegroupComponent;
  let fixture: ComponentFixture<CreateOrUpdateTypegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateTypegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateTypegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
