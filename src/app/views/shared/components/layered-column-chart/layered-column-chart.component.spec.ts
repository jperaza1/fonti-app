import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayeredColumnChartComponent } from './layered-column-chart.component';

describe('LayeredColumnChartComponent', () => {
  let component: LayeredColumnChartComponent;
  let fixture: ComponentFixture<LayeredColumnChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayeredColumnChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayeredColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
