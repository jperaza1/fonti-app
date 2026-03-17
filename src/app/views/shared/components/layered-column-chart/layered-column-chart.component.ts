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
import { AppComponentBase } from "../../../../AppComponentBase";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-layered-column-chart',
  templateUrl: './layered-column-chart.component.html',
  styleUrls: ['./layered-column-chart.component.css']
})
export class LayeredColumnChartComponent  extends AppComponentBase implements OnInit, OnDestroy, OnChanges {
  @ViewChild("chartDiv") chartDiv;
  private chart: am4charts.XYChart;

  @Input("key") key: string = "";
  @Input("value") value: string = "";
  @Input("value2") value2: string = "";
  @Input("name") name: string = "";
  @Input("name2") name2: string = "";
  @Input("title") title: string = "";
  @Input("dataSource") dataSource: any[] = [];
  @Input("clustered") clustered: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { 
    super();
  }

  ngOnInit() {}

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.chart.data = this.dataSource;
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create(
        this.chartDiv.nativeElement,
        am4charts.XYChart
      );

      chart.data = this.dataSource;

      chart.paddingRight = 20;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.key;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = 270;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = this.title;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = this.value;
      series.dataFields.categoryX = this.key;
      series.name = this.name;
      series.tooltipText = `${this.name}: [bold]{valueY}[/]`;
      series.columns.template.events.on("hit", (ev) => this.click(ev, series.name), this)

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = this.value2;
      series2.dataFields.categoryX = this.key;
      series2.name = this.name2;
      series2.tooltipText = `${this.name2}: [bold]{valueY}[/]`;
      
      series2.columns.template.events.on("hit", (ev) => this.click(ev, series2.name), this)
      
      if(this.clustered) {
        series2.clustered = false; // Desactivar agrupación para superponer
        series.clustered = false; // Desactivar agrupación para superponer
        series2.columns.template.width = am4core.percent(40);
      }

      

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.disabled = true;
      chart.cursor.lineY.disabled = true;

      chart.legend = new am4charts.Legend();

      this.chart = chart;
    });
  }



  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  click(event, series) {
    this.onClick.emit({ event: event.target.dataItem.dataContext, series });
  }

}
