export class FilterSaleDto {
  dateFrom: Date;
  dateTo: Date;
  cafeteriaId: number;
  cafeterias: number[];
  saleType: number;
  categoryId: number;
  productTypeId: number;

  constructor() {
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.cafeteriaId = 0;
    this.cafeterias = [];
    this.saleType = 0;
    this.categoryId = 0;
    this.productTypeId = 0;
  }
}