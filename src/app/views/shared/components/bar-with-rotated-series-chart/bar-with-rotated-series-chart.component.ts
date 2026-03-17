import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { isPlatformBrowser } from "@angular/common";
import { AppComponentBase } from "../../../../AppComponentBase";


am4core.useTheme(am4themes_kelly);

@Component({
  selector: 'app-bar-with-rotated-series-chart',
  templateUrl: './bar-with-rotated-series-chart.component.html',
  styleUrls: ['./bar-with-rotated-series-chart.component.css']
})
export class BarWithRotatedSeriesChartComponent extends AppComponentBase implements OnInit, OnDestroy, OnChanges {

  @ViewChild("chartDiv") chartDiv;
  private chart: am4charts.XYChart;
  @Input("key") key: string = "";
  @Input("value") value: string = "";
  @Input("dataSource") dataSource: any[] = [];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { 
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.chart.data = this.dataSource;
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {

      let chart = am4core.create(
        this.chartDiv.nativeElement,
        am4charts.XYChart
      );
      chart.data = this.dataSource;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.key;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      // categoryAxis.dataFields.category = this.key;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Count";

      // let series = chart.series.push(new am4charts.ColumnSeries());
      // series.sequencedInterpolation = true;
      // series.dataFields.valueY = this.value;
      // series.dataFields.categoryX = this.key;
      // series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = this.value;
      series.dataFields.categoryX = this.key;
      series.columns.template.tooltipText = `${this.key}: {categoryX}\n ${this.value}: {valueY}`;

      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.events.on("hit", this.click, this);

      // series.columns.template.column.cornerRadiusTopLeft = 10;
      // series.columns.template.column.cornerRadiusTopRight = 10;
      // series.columns.template.column.fillOpacity = 0.8;

      // let hoverState = series.columns.template.column.states.create("hover");
      // hoverState.properties.cornerRadiusTopLeft = 0;
      // hoverState.properties.cornerRadiusTopRight = 0;
      // hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      // chart.cursor = new am4charts.XYCursor();
      this.chart = chart;
    });

  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  click(event) {
    this.onClick.emit(event.target.dataItem.dataContext);
  }

}
