import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateDishComponent } from './create-or-update-dish.component';

describe('CreateOrUpdateDishComponent', () => {
  let component: CreateOrUpdateDishComponent;
  let fixture: ComponentFixture<CreateOrUpdateDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateDishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
