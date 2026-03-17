import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPreviewComponent } from './graphic-preview.component';

describe('GraphicPreviewComponent', () => {
  let component: GraphicPreviewComponent;
  let fixture: ComponentFixture<GraphicPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
