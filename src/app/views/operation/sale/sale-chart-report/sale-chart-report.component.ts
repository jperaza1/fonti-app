import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SaleService } from '../sale.service';
import { SaleChartFilterDto, SaleChartPointDto } from '../dtos/sale-chart-point-dto';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-sale-chart-report',
  templateUrl: './sale-chart-report.component.html',
  styleUrls: ['./sale-chart-report.component.css']
})
export class SaleChartReportComponent extends AppComponentBase implements OnInit, OnDestroy {
  title = 'Reporte de ventas';
  kind = 'vendor';
  filter = new SaleChartFilterDto();
  points: SaleChartPointDto[] = [];
  loading = false;
  priceProduct = '';
  pricePoints: SaleChartPointDto[] = [];
  priceLoading = false;

  @ViewChild('barChart') barChart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('ventaChart') ventaChart: ElementRef;
  @ViewChild('regaliaChart') regaliaChart: ElementRef;
  @ViewChild('priceChart') priceChart: ElementRef;

  private charts: am4core.Sprite[] = [];
  private priceCharts: am4core.Sprite[] = [];
  private routeSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _saleService: SaleService,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit() {
    this.routeSub = this._route.data.subscribe(data => {
      this.kind = data.kind || 'vendor';
      this.title = data.title || 'Reporte de ventas';
      this.filter = new SaleChartFilterDto();
      this.filter.report = this.kind;
      this.search();
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
    this.disposeCharts();
    this.disposePriceChart();
  }

  get barPoints() {
    return this.points.filter(point => point.series === 'Monto');
  }

  get tipoPoints() {
    return this.points.filter(point => point.series === 'Tipo');
  }

  get pendingPoint() {
    return this.points.find(point => point.series === 'Pendiente');
  }

  get ventaPoints() {
    return this.points.filter(point => point.series === 'Venta');
  }

  get regaliaPoints() {
    return this.points.filter(point => point.series === 'Regalía');
  }

  get tablePoints() {
    if (this.kind === 'product') {
      return this.ventaPoints;
    }
    if (this.kind === 'payment') {
      return this.tipoPoints;
    }
    return this.barPoints;
  }

  async search() {
    this.closePrice();
    this.loading = true;
    this.disposeCharts();
    try {
      this.filter.report = this.kind;
      this.points = await this._saleService.getChartReport(this.filter) || [];
    } finally {
      this.loading = false;
    }
    setTimeout(() => this.render());
  }

  private render() {
    this.disposeCharts();
    if (this.kind === 'product') {
      this.renderBar(this.ventaChart, this.ventaPoints, 'amount', (label) => this.openPrice(label));
      this.renderBar(this.regaliaChart, this.regaliaPoints, 'quantity', (label) => this.openPrice(label));
      return;
    }
    if (this.kind === 'payment') {
      this.renderPie(this.pieChart, this.tipoPoints);
      return;
    }
    this.renderBar(this.barChart, this.barPoints, 'amount');
  }

  async openPrice(product: string) {
    if (!product || this.kind !== 'product') {
      return;
    }
    this.disposePriceChart();
    this.priceProduct = product;
    this.pricePoints = [];
    this.priceLoading = true;
    try {
      const filter = new SaleChartFilterDto();
      filter.dateFrom = this.filter.dateFrom;
      filter.dateTo = this.filter.dateTo;
      filter.report = 'product-price';
      filter.product = product;
      this.pricePoints = await this._saleService.getChartReport(filter) || [];
    } finally {
      this.priceLoading = false;
    }
    setTimeout(() => this.renderBar(this.priceChart, this.pricePoints, 'quantity', null, this.priceCharts));
  }

  closePrice() {
    this.priceProduct = '';
    this.pricePoints = [];
    this.disposePriceChart();
  }

  priceLabel(label: string) {
    const value = Number(label);
    if (!value) {
      return 'Regalía';
    }
    const symbol = this.Currency || 'L';
    return `${symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private renderBar(
    target: ElementRef,
    points: SaleChartPointDto[],
    field: 'amount' | 'quantity',
    onSelect?: (label: string) => void,
    charts: am4core.Sprite[] = this.charts
  ) {
    if (!target?.nativeElement || !points.length) {
      return;
    }
    const chart = am4core.create(target.nativeElement, am4charts.XYChart);
    const priceChart = charts === this.priceCharts;
    chart.data = points.map(point => ({
      category: priceChart ? this.priceLabel(point.label) : point.label,
      value: field === 'amount' ? point.amount : point.quantity
    }));
    chart.paddingRight = 16;
    chart.colors.list = [am4core.color('#2E5BFF'), am4core.color('#00C1D4')];

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.rotation = -35;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.fontSize = 12;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.numberFormatter.numberFormat = field === 'amount' ? '#,###.##' : '#,###';
    valueAxis.renderer.labels.template.fontSize = 12;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';
    series.columns.template.strokeWidth = 0;
    series.columns.template.column.cornerRadiusTopLeft = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.columns.template.tooltipText = field === 'amount'
      ? `{categoryX}: [bold]${this.Currency || 'L'} {valueY}[/]`
      : '{categoryX}: [bold]{valueY}[/]';
    if (onSelect) {
      series.columns.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
      series.columns.template.events.on('hit', (event) => {
        const data = event.target.dataItem && event.target.dataItem.dataContext as { category?: string };
        const label = data && data.category;
        if (!label) {
          return;
        }
        this.zone.run(() => onSelect(label));
      });
    }
    charts.push(chart);
  }

  private renderPie(target: ElementRef, points: SaleChartPointDto[]) {
    if (!target?.nativeElement || !points.length) {
      return;
    }
    const chart = am4core.create(target.nativeElement, am4charts.PieChart);
    chart.data = points.map(point => ({ category: point.label, value: point.amount }));
    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'category';
    series.slices.template.tooltipText = `{category}: [bold]${this.Currency || 'L'} {value}[/]`;
    series.labels.template.text = '{category}';
    this.charts.push(chart);
  }

  private disposeCharts() {
    this.charts.forEach(chart => chart.dispose());
    this.charts = [];
  }

  private disposePriceChart() {
    this.priceCharts.forEach(chart => chart.dispose());
    this.priceCharts = [];
  }
}
