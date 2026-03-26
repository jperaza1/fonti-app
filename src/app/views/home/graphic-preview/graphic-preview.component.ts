import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppComponentBase } from '../../../AppComponentBase';
import { SaleService } from '../../operation/sale/sale.service';
import { GetSalesByMonthDto } from '../../operation/sale/dtos/sale-by-month-dto';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'radar';

const CHART_PALETTE = [
  '#2E5BFF', '#00C1D4', '#8C54FF', '#FAC032', '#F7617D',
  '#2DCE89', '#FF6B35', '#6F42C1', '#20C997', '#E83E8C',
];

@Component({
  selector: 'app-graphic-preview',
  templateUrl: './graphic-preview.component.html',
  styleUrls: ['./graphic-preview.component.css']
})
export class GraphicPreviewComponent extends AppComponentBase implements OnInit, OnDestroy {

  @ViewChild('chartDiv') chartDiv: ElementRef;
  @ViewChild('chartDiv2') chartDiv2: ElementRef;

  salesByMonth: GetSalesByMonthDto[] = [];
  salesByWeek: GetSalesByMonthDto[] = [];

  monthChartType: ChartType = 'bar';
  weekChartType: ChartType = 'line';

  private chartCafeteria: am4core.Sprite;
  private chartWeek: am4core.Sprite;

  private monthChartData: any[] = [];
  private monthCafeterias: string[] = [];
  private weekChartData: any[] = [];
  private weekCafeterias: string[] = [];

  private chartsReady = false;

  constructor(
    private _saleService: SaleService,
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {
    super();
  }

  async ngOnInit() {
    await this.getSalesByCompany();
    await this.getSalesByWeek();
  }

  ngAfterViewInit() {
    this.chartsReady = true;
    if (this.monthChartData.length > 0) this.renderMonthChart();
    if (this.weekChartData.length > 0) this.renderWeekChart();
  }

  ngOnDestroy() {
    this.disposeChart(this.chartCafeteria);
    this.disposeChart(this.chartWeek);
  }

  async getSalesByCompany() {
    this.salesByMonth = await this._saleService.getSalesByMonth();
    this.processMonthData(this.salesByMonth);
    if (this.chartsReady) this.renderMonthChart();
  }

  async getSalesByWeek() {
    this.salesByWeek = await this._saleService.getSalesByWeek();
    this.processWeekData(this.salesByWeek);
    if (this.chartsReady) this.renderWeekChart();
  }

  changeMonthChartType(type: ChartType) {
    if (this.monthChartType === type) return;
    this.monthChartType = type;
    this.renderMonthChart();
  }

  changeWeekChartType(type: ChartType) {
    if (this.weekChartType === type) return;
    this.weekChartType = type;
    this.renderWeekChart();
  }

  // --- Data processing ---

  private processMonthData(sales: GetSalesByMonthDto[]) {
    const grouped: Record<string, any> = {};
    sales.forEach(item => {
      if (!grouped[item.month]) grouped[item.month] = { category: item.month };
      grouped[item.month][item.route] = item.total;
    });
    this.monthChartData = Object.values(grouped);
    this.monthCafeterias = Array.from(new Set(sales.map(x => x.route)));
  }

  private processWeekData(sales: GetSalesByMonthDto[]) {
    const grouped: Record<string, any> = {};
    sales.forEach(item => {
      if (!grouped[item.day]) grouped[item.day] = { category: item.day };
      grouped[item.day][item.route] = item.total;
    });
    this.weekChartData = Object.values(grouped);
    this.weekCafeterias = Array.from(new Set(sales.map(x => x.route)));
  }

  // --- Chart rendering ---

  private renderMonthChart() {
    if (!isPlatformBrowser(this.platformId) || !this.chartDiv?.nativeElement) return;
    this.zone.runOutsideAngular(() => {
      this.chartCafeteria = this.disposeChart(this.chartCafeteria);
      this.chartCafeteria = this.buildChart(
        this.chartDiv.nativeElement,
        this.monthChartData,
        this.monthCafeterias,
        this.monthChartType
      );
    });
  }

  private renderWeekChart() {
    if (!isPlatformBrowser(this.platformId) || !this.chartDiv2?.nativeElement) return;
    this.zone.runOutsideAngular(() => {
      this.chartWeek = this.disposeChart(this.chartWeek);
      this.chartWeek = this.buildChart(
        this.chartDiv2.nativeElement,
        this.weekChartData,
        this.weekCafeterias,
        this.weekChartType
      );
    });
  }

  private buildChart(container: HTMLElement, data: any[], seriesNames: string[], type: ChartType): am4core.Sprite {
    if (type === 'pie') return this.buildPieChart(container, data, seriesNames);
    if (type === 'radar') return this.buildRadarChart(container, data, seriesNames);
    return this.buildXYChart(container, data, seriesNames, type);
  }

  // --- XY Charts (bar, line, area) ---

  private buildXYChart(container: HTMLElement, data: any[], seriesNames: string[], type: ChartType): am4charts.XYChart {
    const chart = am4core.create(container, am4charts.XYChart);
    chart.data = data;
    chart.colors.list = CHART_PALETTE.map(c => am4core.color(c));
    chart.paddingRight = 20;
    chart.paddingTop = 16;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    categoryAxis.renderer.grid.template.strokeOpacity = 0.06;
    categoryAxis.renderer.labels.template.rotation = -35;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    valueAxis.renderer.grid.template.strokeOpacity = 0.06;
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.numberFormatter.numberFormat = '#,###.##';

    seriesNames.forEach((name, i) => {
      const color = am4core.color(CHART_PALETTE[i % CHART_PALETTE.length]);

      if (type === 'bar') {
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = name;
        series.dataFields.categoryX = 'category';
        series.name = name;
        series.columns.template.tooltipText = `${name}\n{categoryX}: [bold]{valueY}[/]`;
        series.columns.template.strokeWidth = 0;
        series.columns.template.fill = color;
        series.columns.template.column.cornerRadiusTopLeft = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.columns.template.fillOpacity = 0.88;
        const hover = series.columns.template.column.states.create('hover');
        hover.properties.fillOpacity = 1;
      } else {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = name;
        series.dataFields.categoryX = 'category';
        series.name = name;
        series.strokeWidth = type === 'area' ? 2.5 : 3;
        series.stroke = color;
        series.fill = color;
        series.tensionX = 0.8;
        series.tensionY = 0.8;
        series.tooltipText = `${name}\n{categoryX}: [bold]{valueY}[/]`;

        if (type === 'area') {
          const gradient = new am4core.LinearGradient();
          gradient.addColor(color, 0.25);
          gradient.addColor(color, 0);
          gradient.rotation = 90;
          series.fill = gradient;
          series.fillOpacity = 1;
        }

        const bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color('#fff');
        bullet.circle.strokeWidth = 2.5;
        bullet.circle.stroke = color;
      }
    });

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeDasharray = '3,3';
    chart.cursor.lineY.strokeDasharray = '3,3';
    chart.cursor.lineX.strokeOpacity = 0.3;
    chart.cursor.lineY.strokeOpacity = 0.3;

    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 12;
    chart.legend.labels.template.fill = am4core.color('#6B7280');
    chart.legend.useDefaultMarker = true;
    const marker = chart.legend.markers.template.children.getIndex(0) as am4core.RoundedRectangle;
    if (marker) {
      marker.cornerRadius(4, 4, 4, 4);
      marker.width = 14;
      marker.height = 14;
    }

    return chart;
  }

  // --- Pie Chart ---

  private buildPieChart(container: HTMLElement, data: any[], seriesNames: string[]): am4charts.PieChart {
    const chart = am4core.create(container, am4charts.PieChart);
    chart.colors.list = CHART_PALETTE.map(c => am4core.color(c));
    chart.innerRadius = am4core.percent(35);
    chart.radius = am4core.percent(75);

    const flatData = this.flattenForPie(data, seriesNames);
    chart.data = flatData;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'label';
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.fillOpacity = 0.9;
    pieSeries.slices.template.states.getKey('hover').properties.scale = 1.05;
    pieSeries.slices.template.states.getKey('hover').properties.fillOpacity = 1;
    pieSeries.labels.template.text = '{label}';
    pieSeries.labels.template.fontSize = 11;
    pieSeries.labels.template.fill = am4core.color('#6B7280');
    pieSeries.ticks.template.strokeOpacity = 0.25;
    pieSeries.tooltip.label.text = '{label}\n[bold]{value}[/]';
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    chart.legend.fontSize = 11;
    chart.legend.labels.template.fill = am4core.color('#6B7280');

    return chart;
  }

  // --- Radar Chart ---

  private buildRadarChart(container: HTMLElement, data: any[], seriesNames: string[]): am4charts.RadarChart {
    const chart = am4core.create(container, am4charts.RadarChart);
    chart.data = data;
    chart.colors.list = CHART_PALETTE.map(c => am4core.color(c));

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.fontSize = 11;
    categoryAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0.06;
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.labels.template.fill = am4core.color('#9CA3AF');

    seriesNames.forEach((name, i) => {
      const color = am4core.color(CHART_PALETTE[i % CHART_PALETTE.length]);
      const series = chart.series.push(new am4charts.RadarSeries());
      series.dataFields.valueY = name;
      series.dataFields.categoryX = 'category';
      series.name = name;
      series.strokeWidth = 2.5;
      series.stroke = color;
      series.fill = color;
      series.fillOpacity = 0.1;
      series.tooltipText = `${name}\n{categoryX}: [bold]{valueY}[/]`;

      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color('#fff');
      bullet.circle.strokeWidth = 2.5;
      bullet.circle.stroke = color;
    });

    chart.cursor = new am4charts.RadarCursor();
    (chart.cursor as any).lineX.strokeOpacity = 0;
    (chart.cursor as any).lineY.strokeOpacity = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 11;
    chart.legend.labels.template.fill = am4core.color('#6B7280');

    return chart;
  }

  // --- Helpers ---

  private flattenForPie(data: any[], seriesNames: string[]): { label: string; value: number }[] {
    const totals: Record<string, number> = {};
    data.forEach(row => {
      seriesNames.forEach(name => {
        if (!totals[name]) totals[name] = 0;
        totals[name] += Number(row[name]) || 0;
      });
    });
    return Object.entries(totals).map(([label, value]) => ({ label, value }));
  }

  private disposeChart(chart: am4core.Sprite): null {
    if (chart) chart.dispose();
    return null;
  }
}
