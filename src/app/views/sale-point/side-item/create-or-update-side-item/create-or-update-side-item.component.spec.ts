import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateSideItemComponent } from './create-or-update-side-item.component';

describe('CreateOrUpdateSideItemComponent', () => {
  let component: CreateOrUpdateSideItemComponent;
  let fixture: ComponentFixture<CreateOrUpdateSideItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateSideItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateSideItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
