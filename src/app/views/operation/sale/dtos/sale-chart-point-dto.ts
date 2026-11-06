export class SaleChartPointDto {
  label: string;
  series: string;
  amount: number;
  quantity: number;
}

export class SaleChartFilterDto {
  dateFrom: Date;
  dateTo: Date;
  report: string;
  product: string;

  constructor() {
    const today = new Date();
    this.dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
    this.dateTo = today;
    this.report = '';
  }
}
