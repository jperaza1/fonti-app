import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDispatchControlComponent } from './list-dispatch-control.component';

describe('ListDispatchControlComponent', () => {
  let component: ListDispatchControlComponent;
  let fixture: ComponentFixture<ListDispatchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDispatchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDispatchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
