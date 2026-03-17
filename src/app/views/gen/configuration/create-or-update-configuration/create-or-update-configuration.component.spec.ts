import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateConfigurationComponent } from './create-or-update-configuration.component';

describe('CreateOrUpdateConfigurationComponent', () => {
  let component: CreateOrUpdateConfigurationComponent;
  let fixture: ComponentFixture<CreateOrUpdateConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
