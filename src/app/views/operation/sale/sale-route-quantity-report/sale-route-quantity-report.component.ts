import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SaleService } from '../sale.service';
import { SaleRouteQuantityFilterDto, SaleRouteQuantityReportDto } from '../dtos/sale-route-quantity-dto';

@Component({
  selector: 'app-sale-route-quantity-report',
  templateUrl: './sale-route-quantity-report.component.html',
  styleUrls: ['./sale-route-quantity-report.component.css']
})
export class SaleRouteQuantityReportComponent extends AppComponentBase implements OnInit {
  private readonly dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  filter = new SaleRouteQuantityFilterDto();
  report = new SaleRouteQuantityReportDto();
  weeks: { days: { name: string, date: Date }[] }[] = [];
  gridRows: any[] = [];
  columns: any[] = [];
  summary: any = { totalItems: [] };
  loading = false;

  constructor(private _saleService: SaleService) {
    super();
  }

  ngOnInit() {
    this.search();
  }

  async search() {
    this.loading = true;
    this.gridRows = [];
    try {
      const report = await this._saleService.getRouteQuantityReport(this.filter);
      this.report = report || new SaleRouteQuantityReportDto();
      this.report.products = this.report.products || [];
      this.report.rows = this.report.rows || [];
      this.report.totals = this.report.totals || [];
      this.bindWeeks();
      this.bindGrid();
    } finally {
      this.loading = false;
    }
  }

  customizeExportData = (_columns, rows) => {
    const text = this.weeks
      .map(week => week.days
        .map(day => `${day.name} ${formatDate(day.date, this.DisplayFormatDate, 'en-US')}`)
        .join('   '))
      .join('  |  ');
    const values = this.columns.map(() => '');
    values[0] = text;
    rows.unshift({ rowType: 'data', values });
  };

  private bindWeeks() {
    const from = this.mondayOf(this.filter.dateFrom);
    const last = this.mondayOf(this.filter.dateTo);
    this.weeks = [];
    for (let cursor = new Date(from); cursor.getTime() <= last.getTime(); cursor.setDate(cursor.getDate() + 7)) {
      const monday = new Date(cursor);
      this.weeks.push({
        days: this.dayNames.map((name, index) => {
          const date = new Date(monday);
          date.setDate(monday.getDate() + index);
          return { name, date };
        })
      });
    }
  }

  private mondayOf(value: Date) {
    const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return date;
  }

  private bindGrid() {
    const products = this.report.products;
    this.columns = [
      { dataField: 'route', caption: 'Ruta' },
      { dataField: 'vendor', caption: 'Vendedor' },
      ...products.map((product, index) => ({
        dataField: 'p' + index,
        caption: product.name,
        dataType: 'number',
        format: '#,##0',
        alignment: 'right'
      }))
    ];
    this.summary = {
      totalItems: [
        { column: 'route', summaryType: 'count', customizeText: () => 'Total' },
        ...products.map((_, index) => ({
          column: 'p' + index,
          summaryType: 'sum',
          valueFormat: '#,##0'
        }))
      ]
    };
    this.gridRows = this.report.rows.map(row => {
      const item: any = { route: row.route, vendor: row.vendor };
      products.forEach((_, index) => {
        const quantities = row.quantities || [];
        item['p' + index] = quantities[index] || 0;
      });
      return item;
    });
  }
}
