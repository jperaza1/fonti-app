import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCorrelativeComponent } from './list-correlative.component';

describe('ListCorrelativeComponent', () => {
  let component: ListCorrelativeComponent;
  let fixture: ComponentFixture<ListCorrelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCorrelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorrelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
