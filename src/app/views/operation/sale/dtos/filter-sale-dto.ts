export class FilterSaleDto {
  dateFrom: Date;
  dateTo: Date;
  routeId: number;
  cafeterias: number[];
  saleType: number;

  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.routeId = 0;
    this.cafeterias = [];
    this.saleType = 1;
  }
}