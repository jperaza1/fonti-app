import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableListComponent } from './custom-table-list.component';

describe('CustomTableListComponent', () => {
  let component: CustomTableListComponent;
  let fixture: ComponentFixture<CustomTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
