import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSideItemComponent } from './list-side-item.component';

describe('ListSideItemComponent', () => {
  let component: ListSideItemComponent;
  let fixture: ComponentFixture<ListSideItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSideItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSideItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
