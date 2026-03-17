import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateSaleComponent } from './create-or-update-sale.component';

describe('CreateOrUpdateSaleComponent', () => {
  let component: CreateOrUpdateSaleComponent;
  let fixture: ComponentFixture<CreateOrUpdateSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
