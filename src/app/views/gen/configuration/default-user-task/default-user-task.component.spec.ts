import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserTaskComponent } from './default-user-task.component';

describe('DefaultUserTaskComponent', () => {
  let component: DefaultUserTaskComponent;
  let fixture: ComponentFixture<DefaultUserTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultUserTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
