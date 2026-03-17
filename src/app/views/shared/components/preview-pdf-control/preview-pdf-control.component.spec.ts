import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPdfControlComponent } from './preview-pdf-control.component';

describe('PreviewPdfControlComponent', () => {
  let component: PreviewPdfControlComponent;
  let fixture: ComponentFixture<PreviewPdfControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPdfControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPdfControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
