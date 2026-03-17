import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPanelBasicTableListComponent } from './no-panel-basic-table-list.component';

describe('BasicTableListComponent', () => {
  let component: NoPanelBasicTableListComponent;
  let fixture: ComponentFixture<NoPanelBasicTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPanelBasicTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPanelBasicTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
