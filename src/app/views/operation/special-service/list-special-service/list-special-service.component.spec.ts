import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialServiceComponent } from './list-special-service.component';

describe('ListSpecialServiceComponent', () => {
  let component: ListSpecialServiceComponent;
  let fixture: ComponentFixture<ListSpecialServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSpecialServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpecialServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
