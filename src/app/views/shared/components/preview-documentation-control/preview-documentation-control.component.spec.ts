import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDocumentationControlComponent } from './preview-documentation-control.component';

describe('PreviewDocumentationControlComponent', () => {
  let component: PreviewDocumentationControlComponent;
  let fixture: ComponentFixture<PreviewDocumentationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDocumentationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDocumentationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
