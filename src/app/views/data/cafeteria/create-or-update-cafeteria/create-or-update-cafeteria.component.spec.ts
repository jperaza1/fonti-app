import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateCafeteriaComponent } from './create-or-update-cafeteria.component';

describe('CreateOrUpdateCafeteriaComponent', () => {
  let component: CreateOrUpdateCafeteriaComponent;
  let fixture: ComponentFixture<CreateOrUpdateCafeteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateCafeteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
