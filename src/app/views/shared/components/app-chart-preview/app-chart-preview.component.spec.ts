import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartPreviewComponent } from './app-chart-preview.component';

describe('AppChartPreviewComponent', () => {
  let component: AppChartPreviewComponent;
  let fixture: ComponentFixture<AppChartPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChartPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChartPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
