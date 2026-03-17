import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarWithRotatedSeriesChartComponent } from './bar-with-rotated-series-chart.component';

describe('BarWithRotatedSeriesChartComponent', () => {
  let component: BarWithRotatedSeriesChartComponent;
  let fixture: ComponentFixture<BarWithRotatedSeriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarWithRotatedSeriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarWithRotatedSeriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
