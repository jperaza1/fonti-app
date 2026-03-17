import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCafeteriaComponent } from './list-cafeteria.component';

describe('ListCafeteriaComponent', () => {
  let component: ListCafeteriaComponent;
  let fixture: ComponentFixture<ListCafeteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCafeteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
