import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateProductComponent } from './create-or-update-product.component';

describe('CreateOrUpdateProductComponent', () => {
  let component: CreateOrUpdateProductComponent;
  let fixture: ComponentFixture<CreateOrUpdateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
