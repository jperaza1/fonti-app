import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeInventoryComponent } from './resume-inventory.component';

describe('ResumeInventoryComponent', () => {
  let component: ResumeInventoryComponent;
  let fixture: ComponentFixture<ResumeInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
