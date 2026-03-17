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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent  extends AppComponentBase implements OnInit, OnDestroy, OnChanges {

  @ViewChild("chartDiv") chartDiv;
  private chart: am4charts.PieChart;

  @Input("key") key: string = "";
  @Input("value") value: string = "";
  @Input("dataSource") dataSource: any[] = [];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { 
    super();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource) {
      this.chart.data = this.dataSource;
    }
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {

      let chart = am4core.create(
        this.chartDiv.nativeElement,
        am4charts.PieChart
      );

      chart.data = this.dataSource;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = this.value;
      pieSeries.dataFields.category = this.key;

      pieSeries.labels.template.text = "{category}: {value}"; // Muestra la categoría y el valor
      pieSeries.labels.template.disabled = false;

      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      pieSeries.slices.template.events.on("hit", this.click, this);

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

  click(event) {
    this.onClick.emit(event.target.dataItem.dataContext);
  }


}
