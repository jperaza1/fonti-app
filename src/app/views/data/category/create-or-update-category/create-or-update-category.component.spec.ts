import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCategoryComponent } from './create-or-update-category.component';

describe('CreateOrUpdateCategoryComponent', () => {
  let component: CreateOrUpdateCategoryComponent;
  let fixture: ComponentFixture<CreateOrUpdateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateCategoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
