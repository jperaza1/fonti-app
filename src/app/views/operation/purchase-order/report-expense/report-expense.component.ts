import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { ExpenseReportFilterDto } from '../dtos/expense-report-filter.dto';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PurchaseOrderService } from '../purchase-order.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export type ChartType = 'bar' | 'pie' | 'line' | 'area' | 'radar';

@Component({
  selector: 'app-report-expense',
  templateUrl: './report-expense.component.html',
  styleUrls: ['./report-expense.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class ReportExpenseComponent extends AppComponentBase implements OnInit, OnDestroy {

  @ViewChild('chartDiv') chartDiv: ElementRef;

  title: string = 'Reporte de Gastos';
  filterExpenseReportDto: ExpenseReportFilterDto = new ExpenseReportFilterDto();
  DxDatasourceCafeteria: any = {};
  DxDatasourceFilterType: any = {};

  DataSource: any[] = [];
  columns: any[] = [];
  summaryCols: any = { totalItems: [] };

  selectedRow: any = null;
  chartData: { fecha: string; monto: number }[] = [];
  selectedChartType: ChartType = 'bar';

  private chart: am4core.Sprite;

  private chartColors = [
    am4core.color('#2E5BFF'),
    am4core.color('#00C1D4'),
    am4core.color('#8C54FF'),
    am4core.color('#FAC032'),
    am4core.color('#F7617D'),
    am4core.color('#2DCE89'),
    am4core.color('#FF6B35'),
    am4core.color('#6F42C1'),
    am4core.color('#20C997'),
    am4core.color('#E83E8C'),
  ];

  constructor(
    private _cafeteriaService: CafeteriaService,
    private _purchaseOrderService: PurchaseOrderService,
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
  ) {
    super();
  }

  async ngOnInit() {
    await this.getCafeteria();
    await this.getFilterType();
  }

  ngOnDestroy() {
    this.disposeChart();
  }

  async getCafeteria() {
    let result = await this._cafeteriaService.getActives();
    this.DxDatasourceCafeteria = this.getDataSourceDx(result);
  }

  async getFilterType() {
    this.DxDatasourceFilterType = [{ value: 1, text: 'Semanal' }, { value: 2, text: 'Mensual' }];
  }

  async getReport() {
    let result = await this._purchaseOrderService.getExpenseReport(this.filterExpenseReportDto);
    this.DataSource = result;
    this.selectedRow = null;
    this.chartData = [];
    this.getColumns();
  }

  getColumns() {
    this.columns = [];
    const totalItems: any[] = [];

    this.columns.push({
      dataField: 'vendor',
      caption: 'Proveedor',
      allowEditing: false,
    });

    if (this.DataSource.length > 0) {
      for (let prop of Object.keys(this.DataSource[0].dateMoves)) {
        const dataField = `dateMoves.${prop}`;
        this.columns.push({
          dataField,
          caption: prop,
          allowEditing: false,
          cellTemplate: 'amountTemplate',
          allowSorting: true,
        });
        totalItems.push({
          column: dataField,
          summaryType: 'sum',
          customizeText: this.dxCustomizeCurrency.bind(this),
          displayFormat: '{0}',
        });
      }
    }

    this.columns.push({
      dataField: 'total',
      caption: 'Total',
      cellTemplate: 'amountTemplate',
      allowEditing: false,
    });

    totalItems.push({
      column: 'total',
      summaryType: 'sum',
      customizeText: this.dxCustomizeCurrency.bind(this),
      displayFormat: '{0}',
    });

    this.summaryCols = { totalItems };
  }

  onRowSelected = (e: any) => {
    this.selectedRow = e.selectedRowsData?.[0] || null;
    this.updateChartData();
  };

  updateChartData() {
    if (!this.selectedRow?.dateMoves) {
      this.chartData = [];
      return;
    }
    this.chartData = Object.entries(this.selectedRow.dateMoves).map(([fecha, monto]) => ({
      fecha,
      monto: Number(monto) || 0
    }));

    setTimeout(() => this.renderChart(), 100);
  }

  changeChartType(type: ChartType) {
    if (this.selectedChartType === type) return;
    this.selectedChartType = type;
    this.renderChart();
  }

  // --- Estadísticas ---

  getTotalMonto(): number {
    return this.chartData.reduce((sum, d) => sum + d.monto, 0);
  }

  getPromedioMonto(): number {
    if (this.chartData.length === 0) return 0;
    return this.getTotalMonto() / this.chartData.length;
  }

  getMaxMonto(): number {
    if (this.chartData.length === 0) return 0;
    return Math.max(...this.chartData.map(d => d.monto));
  }

  // --- Renderizado de gráficos ---

  private renderChart() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.zone.runOutsideAngular(() => {
      this.disposeChart();

      if (!this.chartDiv?.nativeElement || this.chartData.length === 0) return;

      switch (this.selectedChartType) {
        case 'bar': this.createBarChart(); break;
        case 'pie': this.createPieChart(); break;
        case 'line': this.createLineChart(); break;
        case 'area': this.createAreaChart(); break;
        case 'radar': this.createRadarChart(); break;
      }
    });
  }

  private applyXYChartStyle(chart: am4charts.XYChart) {
    chart.paddingRight = 20;
    chart.paddingTop = 20;
    chart.colors.list = [...this.chartColors];

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeDasharray = '3,3';
    chart.cursor.lineY.strokeDasharray = '3,3';
    chart.cursor.lineX.strokeOpacity = 0.4;
    chart.cursor.lineY.strokeOpacity = 0.4;

    let scrollbarX = new am4core.Scrollbar();
    scrollbarX.marginBottom = 10;
    chart.scrollbarX = scrollbarX;
  }

  private createCategoryAxis(chart: am4charts.XYChart): am4charts.CategoryAxis {
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'fecha';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
    categoryAxis.tooltip.disabled = true;
    return categoryAxis;
  }

  private createValueAxis(chart: am4charts.XYChart): am4charts.ValueAxis {
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 12;
    valueAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.numberFormatter.numberFormat = '#,###.##';
    return valueAxis;
  }

  private createBarChart() {
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    chart.data = this.chartData;
    this.applyXYChartStyle(chart);
    this.createCategoryAxis(chart);
    this.createValueAxis(chart);

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'monto';
    series.dataFields.categoryX = 'fecha';
    series.columns.template.tooltipText = '{categoryX}\n[bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;
    series.columns.template.column.cornerRadiusTopLeft = 6;
    series.columns.template.column.cornerRadiusTopRight = 6;
    series.columns.template.fillOpacity = 0.9;

    let hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.cornerRadiusTopLeft = 8;
    hoverState.properties.cornerRadiusTopRight = 8;

    series.columns.template.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    series.columns.template.adapter.add('stroke', (stroke, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    this.chart = chart;
  }

  private createPieChart() {
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.PieChart);
    chart.data = this.chartData;
    chart.colors.list = [...this.chartColors];
    chart.innerRadius = am4core.percent(40);
    chart.radius = am4core.percent(80);

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'monto';
    pieSeries.dataFields.category = 'fecha';

    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.fillOpacity = 0.9;

    pieSeries.slices.template.states.getKey('hover').properties.scale = 1.06;
    pieSeries.slices.template.states.getKey('hover').properties.fillOpacity = 1;

    pieSeries.labels.template.text = '{category}';
    pieSeries.labels.template.fontSize = 12;
    pieSeries.labels.template.fill = am4core.color('#6B7280');
    pieSeries.ticks.template.strokeOpacity = 0.3;

    pieSeries.tooltip.label.text = '{category}\n[bold]{value}[/]';

    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    chart.legend.fontSize = 12;
    chart.legend.labels.template.fill = am4core.color('#6B7280');
    chart.legend.valueLabels.template.fill = am4core.color('#374151');

    this.chart = chart;
  }

  private createLineChart() {
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    chart.data = this.chartData;
    this.applyXYChartStyle(chart);
    this.createCategoryAxis(chart);
    this.createValueAxis(chart);

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'monto';
    series.dataFields.categoryX = 'fecha';
    series.tooltipText = '{categoryX}\n[bold]{valueY}[/]';
    series.strokeWidth = 3;
    series.stroke = am4core.color('#2E5BFF');
    series.tensionX = 0.8;
    series.tensionY = 0.8;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 5;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;
    bullet.circle.stroke = am4core.color('#2E5BFF');

    let hoverState = bullet.states.create('hover');
    hoverState.properties.scale = 1.4;

    let shadow = new am4core.DropShadowFilter();
    shadow.dx = 0;
    shadow.dy = 4;
    shadow.blur = 8;
    shadow.opacity = 0.15;
    series.filters.push(shadow);

    this.chart = chart;
  }

  private createAreaChart() {
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    chart.data = this.chartData;
    this.applyXYChartStyle(chart);
    this.createCategoryAxis(chart);
    this.createValueAxis(chart);

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'monto';
    series.dataFields.categoryX = 'fecha';
    series.tooltipText = '{categoryX}\n[bold]{valueY}[/]';
    series.strokeWidth = 2.5;
    series.stroke = am4core.color('#8C54FF');
    series.fill = am4core.color('#8C54FF');
    series.fillOpacity = 0.15;
    series.tensionX = 0.8;
    series.tensionY = 0.8;

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color('#8C54FF'), 0.3);
    gradient.addColor(am4core.color('#8C54FF'), 0);
    gradient.rotation = 90;
    series.fill = gradient;
    series.fillOpacity = 1;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 2.5;
    bullet.circle.stroke = am4core.color('#8C54FF');

    this.chart = chart;
  }

  private createRadarChart() {
    let chart = am4core.create(this.chartDiv.nativeElement, am4charts.RadarChart);
    chart.data = this.chartData;
    chart.colors.list = [...this.chartColors];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'fecha';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.fontSize = 11;
    categoryAxis.renderer.labels.template.fill = am4core.color('#6B7280');
    categoryAxis.renderer.grid.template.strokeOpacity = 0.1;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.strokeOpacity = 0.08;
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.labels.template.fontSize = 10;
    valueAxis.renderer.labels.template.fill = am4core.color('#9CA3AF');

    let series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = 'monto';
    series.dataFields.categoryX = 'fecha';
    series.strokeWidth = 3;
    series.stroke = am4core.color('#00C1D4');
    series.fill = am4core.color('#00C1D4');
    series.fillOpacity = 0.15;
    series.tooltipText = '{categoryX}\n[bold]{valueY}[/]';

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 5;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;
    bullet.circle.stroke = am4core.color('#00C1D4');

    chart.cursor = new am4charts.RadarCursor();
    (chart.cursor as any).lineX.strokeOpacity = 0;
    (chart.cursor as any).lineY.strokeOpacity = 0;

    this.chart = chart;
  }

  private disposeChart() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
}
