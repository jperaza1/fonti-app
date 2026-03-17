import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypegroupComponent } from './list-typegroup.component';

describe('ListTypegroupComponent', () => {
  let component: ListTypegroupComponent;
  let fixture: ComponentFixture<ListTypegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
