import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTableListComponent } from './basic-table-list.component';

describe('BasicTableListComponent', () => {
  let component: BasicTableListComponent;
  let fixture: ComponentFixture<BasicTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
