import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCorrelativeComponent } from './create-or-update-correlative.component';

describe('CreateOrUpdateCorrelativeComponent', () => {
  let component: CreateOrUpdateCorrelativeComponent;
  let fixture: ComponentFixture<CreateOrUpdateCorrelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCorrelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateCorrelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
